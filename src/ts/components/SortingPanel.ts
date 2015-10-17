import {Component, View, Output, EventEmitter, NgFor} from 'angular2/angular2';

enum SortingDirection {
    ascending = 1,
    descending = -1
}

interface SortingOptionDescriptor {
    title: string,
    id: number,
    value:{property:string, direction: SortingDirection}
}

@Component({
    selector: 'sorting-panel'
})
@View({
    directives: [NgFor],
    templateUrl: 'src/template/sorting-panel.html'
})
class SortingPanel {
    public sortingOptions:SortingOptionDescriptor[] = [];
    @Output()
    public optionChange = new EventEmitter();

    private directionNames:{[direction:string]: string} = {
        '1': 'ascending',
        '-1': 'descending'
    };

    constructor () {
        ['title', 'status'].forEach((name) => {
            this.sortingOptions.push(this.getSortingOptionDescriptor(name, SortingDirection.ascending, this.sortingOptions.length+1));
            this.sortingOptions.push(this.getSortingOptionDescriptor(name, SortingDirection.descending, this.sortingOptions.length+1));
        });
    }

    public optionChanged ($event) {
        this.optionChange.next(this.getSortingOptionById($event.target.value));
    }

    private getSortingOptionById (id:number):SortingOptionDescriptor {
        return id?this.sortingOptions[id-1]:null;
    }

    private getSortingOptionDescriptor (name:string, direction:SortingDirection, id:number):SortingOptionDescriptor {
        var that = this;
        return {
            title: name+' '+that.directionNames[direction],
            id: id,
            value: {
                property: name,
                direction: direction
            }
        }
    }
}

export {SortingPanel, SortingOptionDescriptor, SortingDirection};