/**
 * BLOCK: vlammrs
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
const {  MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { TextareaControl, TextControl } from '@wordpress/components';
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-contact', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Contact page' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Content' ),
		__( 'Header' ),
	],
attributes: {
	content: {
		type: 'string',
	},
	mediaId: {
		type: 'number',
	},
	mediaUrl: {
		type: 'string'
	},
	mail: {
		type: 'string',
	},
	tel: {
		type: 'string',
	},
},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props, setAttributes ) => {
		console.log(props);

		const onSelectMedia = (media) => {
			props.setAttributes({
				mediaId: media.id,
				mediaUrl: media.url
			});
		}

		const updateContent = (content) => {
			props.setAttributes({
				content: content,
			});
		}

		const updateTel = (tel) => {
			props.setAttributes({
				tel: tel,
			});
		}

		const updateMail = (mail) => {
			props.setAttributes({
				mail: mail,
			});
		}


		return (
			<div className="container">
				<div className="container__left">
					<InnerBlocks />
				</div>
				<div className="container__right">
					<div className="container__right--cta">
					{props.attributes.mediaUrl != "" ? 
					(
						<div>
						<img src={props.attributes.mediaUrl} />
						</div>
					)
					: null}
					<MediaUpload
						title={__('Replace image', 'awp')}
						value={props.attributes.mediaId}
						onSelect={onSelectMedia}
						allowedTypes={['image']}
						render={({open}) => (
							<a onClick={open} isDefault isLarge>{__('Selecteer of verander afbeelding', 'awp')}</a>
						)}
					/>
					<TextControl
						label="E-mail adres"
						value={ props.attributes.mail }
						onChange={ ( mail ) => updateMail(mail) }
					/>
					<TextareaControl
						label="Tekst"
						value={ props.attributes.additionalCTA }
						onChange={ ( text ) => updateContent(text) }
					/>
					<TextControl
						label="Telefoon nummer"
						value={ props.attributes.tel }
						onChange={ ( tel ) => updateTel(tel) }
					/>
					</div>
				
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: props => <InnerBlocks.Content />
} );
