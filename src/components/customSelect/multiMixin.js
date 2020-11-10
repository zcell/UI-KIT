import {fieldExtractor} from './helper';

export default {
    methods: {
        updateMultiple(item) {
            let returnedArray = [];
            const itemIdValue = fieldExtractor(item, this.fields.id);
            if (this.currSelected.length === 0) {
                returnedArray.push(item);
            }
            //проверяем на присутсвие записи
            if (this.isRecordIncludes(itemIdValue, this.currSelected)) {
                //удоляем
                returnedArray = [].concat(this.currSelected);
                returnedArray.splice(
                    returnedArray.findIndex(obj => fieldExtractor(obj, this.fields.id) === itemIdValue),
                    1
                );
            } else if (this.currSelected.length > 0) {
                //добовляем
                returnedArray = [item].concat(this.currSelected);
            }
            this.update(returnedArray);
        },
        deleteSelectedItem(item) {
            const id = fieldExtractor(item, this.fields.id);
            this.activeItemIndex = 0;
            this.update(this.currSelected.filter(item => fieldExtractor(item, this.fields.id) !== id));
        },
    },
}