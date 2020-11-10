export default {
    default: `/* JSX Style */
<upload-file onUpdate={e => this.currentFile = e}
             url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempDoc"
             files={this.currentFile}
             headers={{
               authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
               'accept': 'application/json, text/plain, */*'
             }}>
       Выберите файл или перетащите его в выделенную область
       <span slot="button">
           Выбрать файл
       </span>
</upload-file>`,

    multiple: `/* JSX Style */
<upload-file onUpdate={e => this.currentFiles = e}
             url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempDoc"
             files={this.currentFiles}
             multiple={true}
             headers={{
                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
                'accept': 'application/json, text/plain, */*'
             }}>
        Выберите файлы или перетащите их в выделенную область
        <span slot="button">
            Добавить файлы
        </span>
</upload-file>`,
};