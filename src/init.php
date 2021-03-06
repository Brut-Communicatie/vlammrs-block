<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function vlammrs_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'vlammrs-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'vlammrs-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'vlammrs-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'vlammrs-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-vlammrs', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_header_block',
		)
	);
	register_block_type(
		'cgb/block-opsomming', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_opsomming',
		)
	);
	register_block_type(
		'cgb/block-banner', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_banner',
		)
	);
	register_block_type(
		'cgb/block-button', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_button',
		)
	);
	register_block_type(
		'cgb/block-buttonblock', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_buttonblock',
		)
	);
	register_block_type(
		'cgb/block-content', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_content',
		)
	);
	register_block_type(
		'cgb/block-list', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_list',
		)
	);

	register_block_type(
		'cgb/block-sidecontent', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_sidecontent',
		)
	);
	register_block_type(
		'cgb/block-contact', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_contact',
		)
	);
	register_block_type(
		'cgb/block-video', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_video',
		)
	);
	register_block_type(
		'cgb/block-home', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_home',
		)
	);
	register_block_type(
		'cgb/block-homecta', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_homecta',
		)
	);
	register_block_type(
		'cgb/block-column', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'vlammrs-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'vlammrs-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'vlammrs-cgb-block-editor-css',
			'render_callback' => 'render_column',
		)
	);
}

function render_header_block($attributes, $content){
	$CTABlock = $attributes['CTABlock'];

	ob_start();
	echo '<div class="l-contain l-contain--small l-grid l-grid--60-40 l-grid--top c-content">';
	echo '<div class="l-grid__col">';
	echo $content;
	echo '</div>';
	echo '<div class="l-grid__col">';

	if ($CTABlock == "CTA") {
	echo '<div class="c-panel c-panel--max-top">';
	echo '<h2>'. $attributes['calltoaction'] .'</h2>';
	echo '</div>';
	}
	else if ($CTABlock == "LINK"){
	echo '<div class="c-panel c-panel--max-top">';
	echo '<h2>'. $attributes['calltoaction'] .'</h2>';
	echo '</div>';
	echo '<h2 style="margin-top: 2rem;">'. $attributes['additionalCTA'].'</h2>';
	echo '<a class="c-btn" style="letter-spacing: 0;" href="' . $attributes['link'] . '">' . $attributes['linkText'] . '</a>';
	}
	else if ($CTABlock == "BLAUW"){
	echo '<div class="c-panel c-panel--blue c-panel--max-top">';
	echo '<h2>'. $attributes['calltoaction'] .'</h2>';
	echo '<a class="more" href="' . $attributes['link'] . '" target="_self">' . $attributes['linkText'] . '</a>';
	echo '</div>';
	}
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_opsomming($attributes){
	$items = $attributes['items'];
	ob_start();
	echo '<ol class="c-sumup">';
	foreach ($items as $item){
		echo '<li class="c-sumup__item">';
		echo '<span class="c-sumup__title">'. $item[0] .'</span>';
		echo '<p>' . $item[1] . '</p>';
		echo '</li>';
	}
	echo '</ol>';
	return ob_get_clean();
}

function render_banner($attributes){
	ob_start();
	echo '<div class="quote__new">';
	echo '<div class="quote__container">';

	echo '<div class="quote__image">';
	echo '<img width="200px" src="' . $attributes['mediaUrl'] . '" alt="Foto quote"/>';
	echo '</div>';

	echo '<div class="quote__content">';
	echo '<div class="c-quote__quote" style="font-size: 2.5rem;">“Vlammrs biedt human support in de digitale transitie!”</div>';
	echo '<span class="c-quote__author">';
	echo '<p>“Vlammrs biedt met het young data science ontwikkelprogramma projecten uitkomst aan bedrijven. Ze helpt organisaties met digitaal geschoold talent om de noodzakelijke transitie in je bedrijf van binnenuit tot een succes te maken. Zo’n samenwerking biedt perspectief, en past ook bij het economisch DNA van Noord-Brabant!”</p>';
	echo '<p>– Bert Pauli';
	echo '</br> Adviseur, commissaris en toezichthouder, oud-gedeputeerde provincie Noord-Brabant';
	echo '</p>';
	echo '</span>';
	echo '</div>';

	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_button($attributes){
	ob_start();
	echo '<a class="c-btn" href="'. $attributes['link'] .'" target="_self" rel="noopener noreferrer">'. $attributes['text'] .'</a>';
	return ob_get_clean();
}

function render_buttonblock($attributes){
	ob_start();
	echo '<div class="l-grid__col--bg-primary l-grid__col c-banner__panel-heading" style="background-color:#6ad1f9;">';
	echo '<span>' . $attributes['content'] . '</span>';
	echo '<br>';
	if ($attributes['additional']) {
		echo '<p style="    color: #fff;
		font-family: acumin-pro-semi-condensed,sans-serif;
		font-size: 1.375rem;
		font-weight: 300;
		letter-spacing: 0;
		margin: 1rem 0 0;
		line-height: 1.5;">'. $attributes['additional'].'</p>';
	}
	echo '<a class="c-btn" style="letter-spacing: 0;" href="' . $attributes['link'] . '">' . $attributes['text'] . '</a>';
	echo '</div>';
	return ob_get_clean();
}

function render_content($attributes, $content){
	ob_start();
	echo '<div class="c-vacancy l-contain l-contain--small c-content">';
	echo $content;
	echo '</div>';
	return ob_get_clean();
}

function render_list($attributes, $content){
	ob_start();
	echo '<div class="c-vacancy__col">';
	echo $content;
	echo '</div>';
	return ob_get_clean();
}

function render_sidecontent($attributes, $content){
	ob_start();
	echo '<div class="l-contain l-contain--small l-grid l-grid--60-40 l-grid--top c-content"><div class="l-grid__col">';
	echo $content;
	echo '</div></div>';
	return ob_get_clean();
}

function render_contact($attributes, $content){
	ob_start();

	echo '<div class="l-contain l-contain--small l-grid l-grid--60-40 l-grid--contact c-content">';

	echo '<div class="l-grid__col">';
	echo $content;
	echo '</div>';

	echo '<div class="l-grid__col">';
	echo '<div class="c-panel c-panel--max-top c-panel--contact">';
	echo '<img width="1056px" src="' . $attributes['mediaUrl'] . '" />';

	if (isset($attributes['mail'])){
		echo '<p>'.$attributes['mail'].'</p>';
	}

	if (isset($attributes['content'])){
		echo '<p>'.$attributes['content'].'</p>';
	}
	
	if (isset($attributes['tel'])){
		$tel = $attributes['tel'];
		$tel = preg_replace('/[^0-9]/', '', $tel);
		echo '<a href="https://wa.me/'.$tel.'"><i class="fab fa-whatsapp"></i> ' . $attributes['tel'] . '</a>';
	}
	

	echo '</div>';
	echo '</div>';

	echo '</div>';
	return ob_get_clean();
}

function render_video($attributes){
    ob_start();
	echo '<header class="c-banner l-contain c-banner--home" role="banner">';
	echo '<video class="c-banner__video" width="400" autoplay="" loop="" muted="" playsinline="">';
	echo '<source src="'. $attributes['webmUrl'].'" type="video/webm">';
	echo '<source src="'. $attributes['mediaUrl'] .'" type="video/mp4">';
	echo 'Your browser does not support HTML5 video.';
	echo '</video>';
	echo '<div class="l-contain l-contain--small"><div class="c-banner__panel">'; 
	echo '<div class="c-banner__panel-heading">';
	echo $attributes['content'];
	echo '<a class="c-banner__panel-more" href="'.$attributes['link'].'" target="_self">'.$attributes['linkText'].'</a>'; 
	echo '</div>';
	echo '</div>';
	echo '</div>';
	echo '</header>';
    return ob_get_clean();
}

function render_home($attributes, $content) {

	$usps = $attributes['usps'];

	ob_start();
	echo '<div class="l-contain l-contain--small l-grid l-grid--60-40" style="grid-column-gap: 2rem;">';
	echo '<div class="l-grid__col--home c-content">';
	echo $content;
	echo '</div>';
	echo '<div class="l-grid__col l-grid__col--home">';

	echo '<div class="c-usps">';
	echo '<h2 class="c-usps__heading">'.$attributes['text'].'</h2>';
	echo '<p>'.$attributes['content'].'</p>';
	echo '<ul class="c-usps__list">';

	foreach($usps as $usp) {
		echo '<li class="c-usps__item" style="margin-bottom: 15px;font-size: 1.3rem;line-height: 1.5;letter-spacing: 0;">'. $usp .'</li>';
	}

	echo '</ul>';
	echo '</div>';

	echo '<a href="'. $attributes['link'].'" class="c-event">';
	echo '<h2 class="c-event__heading">'. $attributes['quoteText'] .'</h2>';
	echo '<img src="'.$attributes['quoteImg'].'" width="685px" />';
	echo '</a>';
	echo '</div>';
	echo '</div>';
	return ob_get_clean();
}

function render_homecta($attributes, $content){
	ob_start();
	echo '<div class="l-grid__col l-grid__col--bg-primary l-grid__col--home c-content" style="margin-top: 0;">';
	echo $content;
	echo '<a class="c-btn c-btn--white vlamm_blue" href="'. $attributes['link'].'" target="_self">' . $attributes['text'] . '</a>';
	echo '</div>';
	return ob_get_clean();
}


function render_column($attributes, $content){
	ob_start();
	echo '<div class="l-grid__col">';
	echo $content;
	echo '</div>';
	return ob_get_clean();
}
// Hook: Block assets.
add_action( 'init', 'vlammrs_cgb_block_assets' );
