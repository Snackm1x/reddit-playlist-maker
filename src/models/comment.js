export default class Comment {
    constructor(props){
        this.content = props.body;
        this.author = props.author;
        this.id = props.id;
    }
}