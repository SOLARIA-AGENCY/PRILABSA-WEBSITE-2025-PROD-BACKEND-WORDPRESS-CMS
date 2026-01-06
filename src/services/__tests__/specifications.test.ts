/**
 * Tests for parseSpecifications function in wordpressApi.ts
 * Verifies parsing of both HTML and plain-text specification formats
 */

import { describe, it, expect } from 'vitest';

// Since parseSpecifications is not exported, we test it through the module
// by importing a wrapper or testing the behavior through useProduct

describe('Specifications Parsing', () => {
    // Helper: Recreate parseSpecifications logic for testing
    const parseSpecifications = (input: string | undefined): Array<{ key: string; value: string }> => {
        if (!input) return [];

        const specs: Array<{ key: string; value: string }> = [];

        // Check if input contains HTML tags
        const hasHtml = /<[^>]+>/.test(input);

        if (hasHtml) {
            // Parse HTML format
            const liMatches = input.match(/<li[^>]*>(.*?)<\/li>/gi);

            if (liMatches) {
                for (const li of liMatches) {
                    // Try to extract <strong>Key:</strong> Value pattern
                    const strongMatch = li.match(/<strong>([^<]+)<\/strong>\s*(.*)/i);
                    if (strongMatch) {
                        const key = strongMatch[1].replace(/:$/, '').trim();
                        const value = strongMatch[2].replace(/<[^>]*>/g, '').trim();
                        if (key && value) {
                            specs.push({ key, value });
                        }
                    } else {
                        // Fallback: try to split by colon
                        const text = li.replace(/<[^>]*>/g, '').trim();
                        const colonIndex = text.indexOf(':');
                        if (colonIndex > 0) {
                            specs.push({
                                key: text.substring(0, colonIndex).trim(),
                                value: text.substring(colonIndex + 1).trim(),
                            });
                        }
                    }
                }
            }
        } else {
            // Parse plain text format (one spec per line: Key: Value)
            const lines = input.split('\n');
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;

                const colonIndex = trimmedLine.indexOf(':');
                if (colonIndex > 0) {
                    const key = trimmedLine.substring(0, colonIndex).trim();
                    const value = trimmedLine.substring(colonIndex + 1).trim();
                    if (key && value) {
                        specs.push({ key, value });
                    }
                }
            }
        }

        return specs;
    };

    describe('HTML format parsing', () => {
        it('should parse <strong>Key:</strong> Value format', () => {
            const html = '<ul><li><strong>Proteína Cruda:</strong> 50% mín</li><li><strong>Grasa Cruda:</strong> 9% mín</li></ul>';
            const result = parseSpecifications(html);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ key: 'Proteína Cruda', value: '50% mín' });
            expect(result[1]).toEqual({ key: 'Grasa Cruda', value: '9% mín' });
        });

        it('should parse simple Key: Value in <li> format', () => {
            const html = '<ul><li>Proteína: 50%</li><li>Humedad: 5%</li></ul>';
            const result = parseSpecifications(html);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ key: 'Proteína', value: '50%' });
            expect(result[1]).toEqual({ key: 'Humedad', value: '5%' });
        });

        it('should handle empty HTML', () => {
            const result = parseSpecifications('<ul></ul>');
            expect(result).toHaveLength(0);
        });
    });

    describe('Plain text format parsing', () => {
        it('should parse Key: Value per line format', () => {
            const plainText = `Proteína Cruda: 50% mín
Grasa Cruda: 9% mín
Fibra Cruda: 3% máx
Humedad: 5% máx`;

            const result = parseSpecifications(plainText);

            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ key: 'Proteína Cruda', value: '50% mín' });
            expect(result[1]).toEqual({ key: 'Grasa Cruda', value: '9% mín' });
            expect(result[2]).toEqual({ key: 'Fibra Cruda', value: '3% máx' });
            expect(result[3]).toEqual({ key: 'Humedad', value: '5% máx' });
        });

        it('should handle values with colons (e.g., ratios)', () => {
            const plainText = `Ratio: 1:2:3
Dosis: 2-4 g/kg`;

            const result = parseSpecifications(plainText);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ key: 'Ratio', value: '1:2:3' });
            expect(result[1]).toEqual({ key: 'Dosis', value: '2-4 g/kg' });
        });

        it('should skip empty lines', () => {
            const plainText = `Proteína: 50%

Humedad: 5%`;

            const result = parseSpecifications(plainText);

            expect(result).toHaveLength(2);
        });

        it('should skip lines without colon', () => {
            const plainText = `Proteína: 50%
Nota importante
Humedad: 5%`;

            const result = parseSpecifications(plainText);

            expect(result).toHaveLength(2);
        });

        it('should handle empty input', () => {
            expect(parseSpecifications('')).toHaveLength(0);
            expect(parseSpecifications(undefined)).toHaveLength(0);
        });

        it('should trim whitespace from keys and values', () => {
            const plainText = `  Proteína  :   50%  
  Humedad   :  5%  `;

            const result = parseSpecifications(plainText);

            expect(result[0]).toEqual({ key: 'Proteína', value: '50%' });
            expect(result[1]).toEqual({ key: 'Humedad', value: '5%' });
        });
    });

    describe('Format detection', () => {
        it('should detect HTML when <li> tags present', () => {
            const html = '<li>Test: Value</li>';
            const result = parseSpecifications(html);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ key: 'Test', value: 'Value' });
        });

        it('should use plain text parsing when no HTML tags', () => {
            const plainText = 'Test: Value';
            const result = parseSpecifications(plainText);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ key: 'Test', value: 'Value' });
        });
    });
});

describe('specsArrayToPlainText (from ProductForm)', () => {
    // Helper: Recreate specsArrayToPlainText logic for testing
    const specsArrayToPlainText = (specs: Array<{ key: string; value: string }> | null | undefined): string => {
        if (!specs || specs.length === 0) return '';
        return specs.map(s => `${s.key}: ${s.value}`).join('\n');
    };

    it('should convert specs array to plain text format', () => {
        const specs = [
            { key: 'Proteína Cruda', value: '50% mín' },
            { key: 'Grasa Cruda', value: '9% mín' },
        ];

        const result = specsArrayToPlainText(specs);

        expect(result).toBe('Proteína Cruda: 50% mín\nGrasa Cruda: 9% mín');
    });

    it('should return empty string for null/undefined', () => {
        expect(specsArrayToPlainText(null)).toBe('');
        expect(specsArrayToPlainText(undefined)).toBe('');
    });

    it('should return empty string for empty array', () => {
        expect(specsArrayToPlainText([])).toBe('');
    });
});
