const searchMethod = `{ url: 'https://api.presentation.food.true-false.ru/api/public/shop/products',
                               headers: {},
                               field: 'items',
                               nameField: null,
                               idField: null,
                               searchField: 'q',
                               params: {
                                   search: null,
                               }
                             }`;

const items = `[
                { id: 1, value: 'First value' },
                { id: 2, value: 'Second value' },
               ]`;

export default {
    default: `/* JSX Style */
<custom-select items={${items}}
               label="Default" 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,

    multi: `/* JSX Style */
<custom-select items={${items}}
               selected={[]}
               label="Multi" 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,

    singleSearch: `/* JSX Style */
<custom-select items={this.items}
               fields={{id: 'id', value: 'name'}}
               searchCallback={e => this.items = e} 
               searchMethod={${searchMethod}}
               label="Single search" 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,

    multiSearch: `/* JSX Style */
<custom-select selected={[]}
               items={this.items}
               fields={{id: 'id', value: 'name'}}
               searchCallback={e => this.items = e} 
               searchMethod={${searchMethod}}
               label="Multi search" 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,

    localSearch: `/* JSX Style */
<custom-select items={${items}}
               label="Single Local search"
               isLocalSearch={true} 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,

    localMultiSearch: `/* JSX Style */
<custom-select items={${items}}
               label="Multi Local Search"
               selected={[]}
               isLocalSearch={true} 
               onChange="{e => this.onChange(e)}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError} />`,
};
