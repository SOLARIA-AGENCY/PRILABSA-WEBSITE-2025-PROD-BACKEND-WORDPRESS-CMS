#!/usr/bin/env python3
"""
Simple SPA static server with index.html fallback for client-side routing.
Usage:
  python3 scripts/dev_spa_server.py --root dist --port 5174
"""

import argparse
import http.server
import os
import socketserver
from pathlib import Path


class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, directory: str | None = None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def send_head(self):
        # Try to serve the requested path; if it doesn't exist, fall back to index.html
        # This enables client-side routing like /productos/equipos
        requested_path = self.translate_path(self.path)

        # If path is a directory, try index.html inside it first
        if os.path.isdir(requested_path):
            index_path = os.path.join(requested_path, "index.html")
            if os.path.exists(index_path):
                self.path = self.path.rstrip("/") + "/index.html"
                return super().send_head()

        # If the exact file exists, serve it
        if os.path.exists(requested_path) and os.path.isfile(requested_path):
            return super().send_head()

        # Fallback to root index.html for SPA routes
        self.path = "/index.html"
        return super().send_head()


def main():
    parser = argparse.ArgumentParser(description="SPA static server with index.html fallback")
    parser.add_argument("--root", default="dist", help="Directory to serve (default: dist)")
    parser.add_argument("--port", type=int, default=5174, help="Port to listen on (default: 5174)")
    args = parser.parse_args()

    root_dir = Path(args.root).resolve()
    if not root_dir.exists():
        raise SystemExit(f"Root directory not found: {root_dir}")

    handler_class = lambda *hargs, **hkwargs: SPARequestHandler(*hargs, directory=str(root_dir), **hkwargs)  # noqa: E731

    with socketserver.TCPServer(("", args.port), handler_class) as httpd:
        print(f"Serving {root_dir} at http://localhost:{args.port} (SPA fallback enabled)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down...")


if __name__ == "__main__":
    main()


