<?php
/**
 * Plugin Name: Inner Tide CMS
 * Description: Content model and frontend revalidation for the Inner Tide headless site.
 * Version: 1.0.0
 * Author: Inner Tide Studios
 * Requires at least: 6.4
 * Requires PHP: 8.1
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the Services content type exposed at /wp-json/wp/v2/services.
 */
function inner_tide_register_service_post_type()
{
    register_post_type('service', [
        'labels' => [
            'name' => __('Services', 'inner-tide'),
            'singular_name' => __('Service', 'inner-tide'),
            'add_new_item' => __('Add New Service', 'inner-tide'),
            'edit_item' => __('Edit Service', 'inner-tide'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'services',
        'menu_icon' => 'dashicons-universal-access-alt',
        'has_archive' => false,
        'rewrite' => ['slug' => 'services'],
        'supports' => [
            'title',
            'editor',
            'excerpt',
            'thumbnail',
            'revisions',
            'page-attributes',
        ],
        'template' => [],
    ]);
}
add_action('init', 'inner_tide_register_service_post_type');

/**
 * Keep ACF field definitions with this plugin so the schema is versioned.
 */
function inner_tide_acf_json_load_paths($paths)
{
    $paths[] = plugin_dir_path(__FILE__) . 'acf-json';
    return $paths;
}
add_filter('acf/settings/load_json', 'inner_tide_acf_json_load_paths');

function inner_tide_acf_json_save_path($path)
{
    return plugin_dir_path(__FILE__) . 'acf-json';
}
add_filter('acf/settings/save_json', 'inner_tide_acf_json_save_path');

/**
 * Notify the Next.js frontend after published content changes.
 *
 * Add these constants to wp-config.php:
 * define('INNER_TIDE_REVALIDATE_URL', 'https://inner-tide.studio/api/revalidate');
 * define('INNER_TIDE_REVALIDATE_SECRET', 'a-long-random-value');
 */
function inner_tide_revalidate_frontend($post_id, $post, $update)
{
    if (
        !defined('INNER_TIDE_REVALIDATE_URL') ||
        !defined('INNER_TIDE_REVALIDATE_SECRET') ||
        wp_is_post_revision($post_id) ||
        wp_is_post_autosave($post_id) ||
        !in_array($post->post_type, ['post', 'service'], true)
    ) {
        return;
    }

    // Draft changes cannot affect the public frontend.
    if (!in_array($post->post_status, ['publish', 'trash'], true)) {
        return;
    }

    wp_remote_post(INNER_TIDE_REVALIDATE_URL, [
        'timeout' => 5,
        'blocking' => false,
        'headers' => [
            'Content-Type' => 'application/json',
            'X-Inner-Tide-Secret' => INNER_TIDE_REVALIDATE_SECRET,
        ],
        'body' => wp_json_encode([
            'type' => $post->post_type,
            'slug' => $post->post_name,
        ]),
    ]);
}
add_action('save_post', 'inner_tide_revalidate_frontend', 10, 3);

/**
 * Revalidate when an item is deleted permanently.
 */
function inner_tide_revalidate_deleted_content($post_id)
{
    $post = get_post($post_id);
    if (!$post || !in_array($post->post_type, ['post', 'service'], true)) {
        return;
    }

    inner_tide_revalidate_frontend($post_id, $post, true);
}
add_action('before_delete_post', 'inner_tide_revalidate_deleted_content');

