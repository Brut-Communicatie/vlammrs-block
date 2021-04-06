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

registerBlockType( 'cgb/block-opsomming', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Vlammrs: Opsomming' ), // Block title.
	icon: 'dashicons-admin-site-alt3', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Vlammrs' ),
		__( 'Vlammrs Header' ),
		__( 'Header' ),
    ],
    attributes : {
        items : {
            type: 'array',
        },
        title : {
            type: 'string',
        },
        content : {
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

        const addAmount = () => {

            const obj = [
                props.attributes.title,
                props.attributes.content
            ]

            let array = props.attributes.items;
            
            if (!array){
                array = [];
                array = [...array, obj];
            } else {
                array = [...array, obj];
            }

            props.setAttributes({
                items: array,
            });

            console.log(props.attributes.items);
        }

        const updateTitle = (e) => {
            props.setAttributes({
                title: e.target.value,
            });
        }

        const updateContent = (e) => {
            props.setAttributes({
                content: e.target.value,
            });
        }

		return (
			<div className="test">
                <input type="text" placeholder="Title" onChange={updateTitle} onBlur={updateTitle}></input>
                <input type="text" placeholder="Content" onChange={updateContent} onBlur={updateContent}></input>
                <div className="add" onClick={addAmount}>Add</div>


                
                {
                props.attributes.items ? 
                props.attributes.items.map((item, index) => 
                    <div>
                        {index + 1}
                        {item[0]} 
                        {item[1]}
                    </div>
                ) : null}
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
