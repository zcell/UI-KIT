export default {
    default: `/* JSX Style */
 <custom-textarea label="Label"
                  minHeight={20}
                  maxHeight={120}
                  value={this.textareaValue}
                  onInput={e => this.onInput(e)}
                />`,

    withPlaceholder: `/* JSX Style */
 <custom-textarea label="Label"
                  minHeight={20}
                  maxHeight={120}
                  placeholder="Placeholder"
                  value={this.textareaValue}
                  onInput={e => this.onInput(e)}
                />`,

};