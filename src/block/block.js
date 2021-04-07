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

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

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
registerBlockType( 'cgb/block-vlammrs', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Header' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Header' ),
		__( 'Header' ),
	],
attributes: {
	calltoaction : {
		type: 'string'
	},
	additionalCTA : {
		type: 'string'
	},
	CTABlock: {
		type: 'string'
	},
	link: {
		type: 'string',
	},
	linkText: {
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
		const updateCTA = (e) =>{
			props.setAttributes({
				calltoaction: e.target.value,
			});
		}

		const updateType = (e) => {
			props.setAttributes({
				CTABlock: e.target.value,
			});
		}

		const updateLink = (e) => {
			props.setAttributes({
				link: e.target.value,
			});
		}

		const updateLinkText = (e) => {
			props.setAttributes({
				linkText: e.target.value,
			});
		}

		const CHOICES_MAP = [
			{ value: "CTA", name: "CTA"},
			{ value: "LINK", name: "CTA met link"},
			{ value: "BLAUW", name: "Blauw met link"}
		]

		return (
			<div className="container">
				<div className="container__left">
					<InnerBlocks />
				</div>
				<div className="container__right">
					<div class="container__right--options">
						<p>Selecteer blok type:</p>
						<select onChange={updateType} onBlur={updateType} value={props.attributes.CTABlock != "" ? (props.attributes.CTABlock) : null}>
							<option disabled selected>Maak een keuze</option>
							{CHOICES_MAP.map((item) => 
								<option key={item.value} value={item.value}>{item.name}</option>
							)}
						</select>
					</div>

					{props.attributes.CTABlock == "CTA" ? 
					<div className="container__right--cta">
					<input type="text" value={props.attributes.calltoaction != "" ? (props.attributes.calltoaction) : null} onBlur={updateCTA} onChange={updateCTA} placeholder="Voer hier de CTA in..."/>
					</div>
					: null}

					{props.attributes.CTABlock == "LINK" ? 
					<div>
					<div className="container__right--cta">
					<input type="text" value={props.attributes.calltoaction != "" ? (props.attributes.calltoaction) : null} onBlur={updateCTA} onChange={updateCTA} placeholder="Voer hier de CTA in..."/>
					</div>
					<div className="container__right--links">
						<input type="text" placeholder="Link tekst" onChange={updateLinkText} onBlur={updateLinkText}  value={props.attributes.linkText != "" ? (props.attributes.linkText) : null}/>
						<input type="text" placeholder="Link" onChange={updateLink} onBlur={updateLink}  value={props.attributes.link != "" ? (props.attributes.link) : null}/>
					</div>
					</div>
					: null}


					{props.attributes.CTABlock == "BLAUW" ? 
					<div className="container__right--cta container__right--cta-blue">
					<input type="text" value={props.attributes.calltoaction != "" ? (props.attributes.calltoaction) : null} onBlur={updateCTA} onChange={updateCTA} placeholder="Voer hier de CTA in..."/>
					<div className="container__right--links">
						<input type="text" placeholder="Link tekst" onChange={updateLinkText} onBlur={updateLinkText}  value={props.attributes.linkText != "" ? (props.attributes.linkText) : null}/>
						<input type="text" placeholder="Link" onChange={updateLink} onBlur={updateLink}  value={props.attributes.link != "" ? (props.attributes.link) : null}/>
					</div>
					</div>
					: null}
					
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
