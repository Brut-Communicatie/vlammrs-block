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
import { TextareaControl } from '@wordpress/components';
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
let defaultCount = 0;

registerBlockType( 'cgb/block-banner', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Banner' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Banner' ),
		__( 'Banner' ),
    ],
    attributes : {
        mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string'
		},
        titel: {
			type: 'string'
		},
        quote: {
			type: 'string'
		},
        naam: {
			type: 'string'
		},
        functie: {
			type: 'string'
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

        const updateNaam = (e) => {
            props.setAttributes({
                naam: e.target.value,
            });
        }

        const updateQuote = (text) => {
            props.setAttributes({
                quote: text,
            });
        }
        
        const updateTitel = (text) => {
            props.setAttributes({
                titel: text,
            });
        }
        
        const updateFunctie = (e) => {
            props.setAttributes({
                functie: e.target.value,
            });
        }
        

		return (
			<div className="banner">
                <div className="banner__image">
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
                </div>
                <div className="banner__content">
				<TextareaControl
						label="Titel"
						value={ props.attributes.titel }
						onChange={ ( text ) => updateTitel(text) }
					/>
				<TextareaControl
						label="Quote"
						value={ props.attributes.quote }
						onChange={ ( text ) => updateQuote(text) }
					/>
				<input type="text" onBlur={updateNaam} onChange={updateNaam} placeholder="Naam" value={props.attributes.naam != "" ? (props.attributes.naam) : null} />
                <br/>
				<input type="text" onBlur={updateFunctie} onChange={updateFunctie} placeholder="Functie" value={props.attributes.functie != "" ? (props.attributes.functie) : null} />
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
