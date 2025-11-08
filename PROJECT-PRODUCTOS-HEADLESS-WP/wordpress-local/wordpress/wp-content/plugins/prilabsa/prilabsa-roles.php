<?php
/**
 * PRILABSA Custom Roles Configuration
 *
 * Define custom WordPress roles with granular permissions for PRILABSA CMS
 * Designed for non-technical users to manage productos, blog, and noticias only
 *
 * @package PRILABSA_Roles
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create custom role "Editor PRILABSA" on plugin activation
 *
 * Role capabilities:
 * - Full CRUD for productos (products)
 * - Full CRUD for blog posts
 * - Full CRUD for noticias (news)
 * - Upload files (for product images, PDFs)
 * - NO access to: plugins, themes, settings, users, other post types
 */
function prilabsa_create_custom_roles() {
	// Remove role if exists (for clean reinstall)
	remove_role( 'editor_prilabsa' );

	// Create role with minimal capabilities
	$role = add_role(
		'editor_prilabsa',
		__( 'Editor PRILABSA', 'prilabsa' ),
		array(
			// General capabilities
			'read'                   => true,  // Access to WordPress dashboard
			'upload_files'           => true,  // Upload images/PDFs

			// Productos capabilities
			'edit_productos'              => true,  // Edit own productos
			'edit_published_productos'    => true,  // Edit published productos
			'edit_others_productos'       => true,  // Edit productos from other users
			'publish_productos'           => true,  // Publish productos
			'delete_productos'            => true,  // Delete own productos
			'delete_published_productos'  => true,  // Delete published productos
			'delete_others_productos'     => true,  // Delete productos from other users
			'read_private_productos'      => true,  // Read private productos

			// Blog capabilities
			'edit_posts'              => true,  // Edit own blog posts
			'edit_published_posts'    => true,  // Edit published blog posts
			'edit_others_posts'       => true,  // Edit blog posts from other users
			'publish_posts'           => true,  // Publish blog posts
			'delete_posts'            => true,  // Delete own blog posts
			'delete_published_posts'  => true,  // Delete published blog posts
			'delete_others_posts'     => true,  // Delete blog posts from other users
			'read_private_posts'      => true,  // Read private blog posts

			// Noticias capabilities
			'edit_noticias'              => true,  // Edit own noticias
			'edit_published_noticias'    => true,  // Edit published noticias
			'edit_others_noticias'       => true,  // Edit noticias from other users
			'publish_noticias'           => true,  // Publish noticias
			'delete_noticias'            => true,  // Delete own noticias
			'delete_published_noticias'  => true,  // Delete published noticias
			'delete_others_noticias'     => true,  // Delete noticias from other users
			'read_private_noticias'      => true,  // Read private noticias

			// Categories & Tags (for all post types)
			'manage_categories'       => true,  // Manage categories
			'edit_categories'         => true,  // Edit categories
			'delete_categories'       => true,  // Delete categories
			'assign_categories'       => true,  // Assign categories to posts

			// Denied capabilities (security)
			'edit_theme_options'      => false, // NO access to theme/appearance
			'install_plugins'         => false, // NO plugin installation
			'activate_plugins'        => false, // NO plugin activation
			'update_plugins'          => false, // NO plugin updates
			'delete_plugins'          => false, // NO plugin deletion
			'install_themes'          => false, // NO theme installation
			'update_themes'           => false, // NO theme updates
			'delete_themes'           => false, // NO theme deletion
			'edit_users'              => false, // NO user editing
			'create_users'            => false, // NO user creation
			'delete_users'            => false, // NO user deletion
			'manage_options'          => false, // NO access to settings
			'unfiltered_html'         => false, // NO unfiltered HTML (security)
		)
	);

	// Log role creation
	if ( $role ) {
		error_log( 'PRILABSA: Role "Editor PRILABSA" created successfully' );
	} else {
		error_log( 'PRILABSA: Failed to create role "Editor PRILABSA"' );
	}
}

/**
 * Delete custom role on plugin deactivation (cleanup)
 */
function prilabsa_remove_custom_roles() {
	remove_role( 'editor_prilabsa' );
	error_log( 'PRILABSA: Role "Editor PRILABSA" removed' );
}

// Hook: Create role on plugin activation
register_activation_hook( PRILABSA_PLUGIN_DIR . 'prilabsa.php', 'prilabsa_create_custom_roles' );

// Hook: Remove role on plugin deactivation
register_deactivation_hook( PRILABSA_PLUGIN_DIR . 'prilabsa.php', 'prilabsa_remove_custom_roles' );

/**
 * Grant Administrator all custom post type capabilities
 * (Ensures admin can manage productos, blog, noticias)
 */
function prilabsa_grant_admin_capabilities() {
	$admin_role = get_role( 'administrator' );

	if ( ! $admin_role ) {
		return;
	}

	// Productos capabilities
	$admin_role->add_cap( 'edit_productos' );
	$admin_role->add_cap( 'edit_published_productos' );
	$admin_role->add_cap( 'edit_others_productos' );
	$admin_role->add_cap( 'publish_productos' );
	$admin_role->add_cap( 'delete_productos' );
	$admin_role->add_cap( 'delete_published_productos' );
	$admin_role->add_cap( 'delete_others_productos' );
	$admin_role->add_cap( 'read_private_productos' );

	// Noticias capabilities
	$admin_role->add_cap( 'edit_noticias' );
	$admin_role->add_cap( 'edit_published_noticias' );
	$admin_role->add_cap( 'edit_others_noticias' );
	$admin_role->add_cap( 'publish_noticias' );
	$admin_role->add_cap( 'delete_noticias' );
	$admin_role->add_cap( 'delete_published_noticias' );
	$admin_role->add_cap( 'delete_others_noticias' );
	$admin_role->add_cap( 'read_private_noticias' );
}

// Hook: Grant admin capabilities after theme/plugin switch
add_action( 'admin_init', 'prilabsa_grant_admin_capabilities' );

/**
 * Simplify admin menu for Editor PRILABSA role
 * Hide unnecessary menu items for non-technical users
 */
function prilabsa_simplify_admin_menu() {
	// Only apply to Editor PRILABSA users
	$current_user = wp_get_current_user();
	if ( ! in_array( 'editor_prilabsa', $current_user->roles, true ) ) {
		return;
	}

	// Remove unnecessary menu items
	remove_menu_page( 'edit-comments.php' );        // Comments
	remove_menu_page( 'tools.php' );                // Tools
	remove_menu_page( 'options-general.php' );      // Settings
	remove_menu_page( 'themes.php' );               // Appearance
	remove_menu_page( 'plugins.php' );              // Plugins
	remove_menu_page( 'users.php' );                // Users

	// Optional: Remove other default post types if needed
	// remove_menu_page( 'edit.php?post_type=page' ); // Pages
}

add_action( 'admin_menu', 'prilabsa_simplify_admin_menu', 999 );

/**
 * Customize admin bar for Editor PRILABSA users
 * Remove confusing links and options
 */
function prilabsa_customize_admin_bar( $wp_admin_bar ) {
	$current_user = wp_get_current_user();
	if ( ! in_array( 'editor_prilabsa', $current_user->roles, true ) ) {
		return;
	}

	// Remove items from admin bar
	$wp_admin_bar->remove_node( 'comments' );           // Comments
	$wp_admin_bar->remove_node( 'new-page' );           // New Page
	$wp_admin_bar->remove_node( 'customize' );          // Customize (theme)
	$wp_admin_bar->remove_node( 'updates' );            // Updates
	$wp_admin_bar->remove_node( 'wp-logo' );            // WordPress logo
}

add_action( 'admin_bar_menu', 'prilabsa_customize_admin_bar', 999 );

/**
 * Display welcome message for Editor PRILABSA users
 * Guide non-technical users on what they can do
 */
function prilabsa_editor_welcome_message() {
	$current_user = wp_get_current_user();
	if ( ! in_array( 'editor_prilabsa', $current_user->roles, true ) ) {
		return;
	}

	$screen = get_current_screen();
	if ( $screen->id !== 'dashboard' ) {
		return;
	}

	?>
	<div class="notice notice-info is-dismissible" style="border-left: 4px solid #0073aa; padding: 15px;">
		<h2>🎉 Bienvenido al Panel PRILABSA</h2>
		<p><strong>Tu rol:</strong> Editor PRILABSA</p>
		<p>Puedes gestionar:</p>
		<ul style="list-style: disc; margin-left: 20px;">
			<li>📦 <strong>Productos</strong> - Crear, editar y eliminar productos del catálogo</li>
			<li>📝 <strong>Blog</strong> - Crear, editar y publicar artículos técnicos</li>
			<li>📰 <strong>Noticias</strong> - Crear, editar y publicar noticias de la empresa</li>
		</ul>
		<p style="margin-top: 15px;">
			<em>Usa el menú de la izquierda para comenzar. Si necesitas ayuda, contacta al administrador.</em>
		</p>
	</div>
	<?php
}

add_action( 'admin_notices', 'prilabsa_editor_welcome_message' );
