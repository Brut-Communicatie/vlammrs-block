/**
 * BLOCK: opsomming
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {  MediaUpload } = wp.blockEditor;
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

registerBlockType( 'cgb/block-video', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Video' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Video' ),
		__( 'Video' ),
    ],
    attributes : {
        mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string'
		},
        webmId: {
			type: 'number',
		},
		webmUrl: {
			type: 'string'
		},
        content : {
            type: 'string',
        },
        linkText : {
            type: 'string',
        },
        link: {
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
    
	edit: ( props ) => {
		console.log(props);
        const onSelectMedia = (media) => {
			props.setAttributes({
				mediaId: media.id,
				mediaUrl: media.url
			});
		}

        const onSelectWebM = (media) => {
			props.setAttributes({
				webmId: media.id,
				webmUrl: media.url
			});
		}

        const updateContent = (content) => {
            props.setAttributes({
                content: content,
            });
        }

        const updateLinkText = (txt) => {
            props.setAttributes({
                linkText: txt,
            });
        }

        const updateLink = (link) => {
            props.setAttributes({
                link: link,
            });
        }
        
		return (
			<div className="video">
                <div className="video__media">
                {props.attributes.mediaUrl != "" ? 
				(
					<video autoplay muted loop controls>
                        <source src={props.attributes.mediaUrl} type="video/mp4" />
					</video>
				)
				: null}
				<MediaUpload
					title={__('Replace video', 'awp')}
					value={props.attributes.mediaId}
					onSelect={onSelectMedia}
					allowedTypes={['image']}
					render={({open}) => (
						<a onClick={open} isDefault isLarge>{__('Selecteer of verander video', 'awp')}</a>
					)}
				/>
                <br/>
                {props.attributes.webmUrl != "" ? 
				(
					<div>{props.attributes.webmUrl} <br/></div>
				)
				: null}
            
                	<MediaUpload
					title={__('Replace video', 'awp')}
					value={props.attributes.webmId}
					onSelect={onSelectWebM}
					allowedTypes={['image']}
					render={({open}) => (
						<a onClick={open} isDefault isLarge>{__('Selecteer of verander webm', 'awp')}</a>
					)}
				/>
                </div>
                <div className="video__content">
				<TextareaControl
                    label="Content"
                    value={ props.attributes.content }
                    onChange={ ( text ) => updateContent(text) }
                />
				<TextControl
                    label="Link tekst"
                    value={ props.attributes.linkText }
                    onChange={ ( text ) => updateLinkText(text) }
                />
                <TextControl
                    label="Link"
                    value={ props.attributes.link }
                    onChange={ ( text ) => updateLink(text) }
                />
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
	save: (props) => {
        return null;
    }
} );
