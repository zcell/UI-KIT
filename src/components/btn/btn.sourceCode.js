export default {
    default: `/* JSX Style */
<btn onClick={() => this.onClick}
     onClearError={() => this.onClearError}
     onDblclick={() => this.onDblclick}
     >
    Button
</btn>`,

    typeSuccess: `/* JSX Style */
<btn onClick={() => this.onClick}
     onClearError={() => this.onClearError}
     onDblclick={() => this.onDblclick}
     type="success"
     >
     Button 
    />
</btn>`,

    typeDanger: `/* JSX Style */
<btn onClick={() => this.onClick}
     onClearError={() => this.onClearError}
     onDblclick={() => this.onDblclick}
     type="danger"
     >
     Button 
    />
</btn>`,

    withIcon: `/* JSX Style */
<btn onClick={() => this.onClick}
     onClearError={() => this.onClearError}
     onDblclick={() => this.onDblclick}
     iconPosition="last"
     >
     Button 
    <img class="btnStories__img"
         src="https://icon-icons.com/icons2/1515/PNG/32/success_105075.png"
         alt="ads via Carbon"
         slot="icon"
         style={'width:22px; height: 22px;'}
    />
</btn>`,
}