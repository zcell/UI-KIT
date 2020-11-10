export default {
    default: `/* JSX Style */
 <custom-input label="Title"
               value={this.inputValue}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError}
               onFocus={() => this.onFocus}
               onChange={() => this.onChange}
               onBlur={e => this.onBlur(e)}
               onClick={() => this.onClick}
               />`,

    typeNumber: `/* JSX Style */
<custom-input label="Title"
               value={this.inputValue}
               type="number"
               min={0}
               max={99}
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError}
               onFocus={() => this.onFocus}
               onChange={() => this.onChange}
               onBlur={e => this.onBlur(e)}
               onClick={() => this.onClick}
               />`,

    typeTel: `/* JSX Style */
<custom-input label="Title"
               value={this.inputValue}
               type="tel"
               mask="\\+7 (111) 1111-11"
               onInput={e => this.onInput(e)}
               onClearError={() => this.onClearError}
               onFocus={() => this.onFocus}
               onChange={() => this.onChange}
               onBlur={e => this.onBlur(e)}
               onClick={() => this.onClick}
               />`,


};