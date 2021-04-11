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
import { TextControl } from '@wordpress/components';
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
registerBlockType( 'cgb/block-home', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Home content' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Home' ),
		__( 'Header' ),
	],
attributes: {
	usps : {
		type: 'array',
	},
	usp : {
		type: 'string',
	},
	text: {
		type: 'string',
	},
	content: {
		type: 'string',
	},
	quotes: {
		type: 'object',
	},
	quote: {
		type: 'string',
	},
	post: {
		type: 'object',
	},
	language: { 
		type: 'string',
		default: 'nl',
	},
	link: {
		type: 'string',
	},
	quoteImg: {
		type: 'string',
	},
	quoteText: {
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

		if (!props.attributes.quotes){
			wp.apiFetch( {
				url: `/wp-json/wp/v2/events?_embed&lang=${props.attributes.language}`
			}).then( events => {
				props.setAttributes({
					quotes: events,
				})
			})
		}

		if (props.attributes.quote && !props.attributes.post){
			wp.apiFetch( {
				url: `/wp-json/wp/v2/events/${props.attributes.quote}?_embed&lang=${props.attributes.language}`
			}).then( post => {
				props.setAttributes({
					post: post,
					link: post.link,
					quoteImg: post._embedded['wp:featuredmedia'][0].source_url,
				})
			})
		}

		const addUsp = () => {
            const obj = props.attributes.usp;
            let array = props.attributes.usps;
            
            if (!array){
                array = [];
                array = [...array, obj];
            } else {
                array = [...array, obj];
            }

            props.setAttributes({
                usps: array,
            });
        }

		const updateUsp = (e) => {
            props.setAttributes({
                usp: e.target.value,
            });
        }

		const deleteItem = (index) => {
            const arr = props.attributes.usps;
            arr.splice(index, 1);
            props.setAttributes({
                usps: false,
            });
            props.setAttributes({
                usps: arr,
            });
        }

		const updateTitle = (txt) => {
			props.setAttributes({
				text: txt,
			});
		}

		const updateContent = (txt) => {
			props.setAttributes({
				content: txt,
			});
		}

		const updateQuote = (e) => {
			props.setAttributes({
				quote: e.target.value,
				post: false,
			});
		}
		const changeLanguage = (e) => {
			props.setAttributes({
				language: e.target.value,
				quotes: false,
			});
		}

		const updateQuoteText = (text) => {
			props.setAttributes({
				quoteText: text,
			});
		}

		return (
			<div className="home">
				<div className="home__left">
					<InnerBlocks />
				</div>
				<div className="home__right">

					<div className="home__right--top">
						<TextControl
						label="Top tekst"
						value={ props.attributes.text }
						onChange={ ( text ) => updateTitle(text) }
						/>

						<TextareaControl
						label="Top content"
						value={ props.attributes.content }
						onChange={ ( text ) => updateContent(text) }
						/>
					</div>

					<div className="home__opsomming">
					<input type="text" placeholder="Voer hier een USP in" onChange={updateUsp} onBlur={updateUsp}></input>
					<div className="add" onClick={addUsp}>Voeg toe</div>
					{
					props.attributes.usps ? 
					props.attributes.usps.map((item, index) => 
						<div className="home__opsomming--item">
							{item} 
							<div className="home__opsomming--item__delete">
								<div className="home__opsomming--item__delete--btn" onClick={() => deleteItem(index)}>Verwijder</div>
							</div>
						</div>
						
					) : null}
					</div>
					<div className="home__quote">
						<h3>Selecteer quote</h3>
						<select onChange={changeLanguage} value={props.attributes.language ? props.attributes.language : null}>
							<option disabled selected>Kies een taal</option>
							<option value="nl">Nederlands</option>
							<option value="en">Engels</option>
						</select>

						<select onChange={updateQuote} value={props.attributes.quote ? props.attributes.quote : null}>
							<option disabled selected>Maak een keuze</option>
						{props.attributes.quotes ? 
							props.attributes.quotes.map( quote => {
								return (
									<option value={quote.id}>{quote.title.rendered}</option>
								)
							})
						 : null}
						</select>

						{props.attributes.post ? 
							 (
								<div>
									<img src={props.attributes.quoteImg} />
								</div>
							)
						 : null}
						<br/>
						<TextareaControl
						label="Quote"
						value={ props.attributes.quoteText }
						onChange={ ( text ) => updateQuoteText(text) }
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
