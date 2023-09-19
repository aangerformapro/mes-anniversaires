import {isEmpty, isNumeric, isString} from "@/modules/utils";
import Model from "../modules/stores/Model.js";
import {Person} from "./Person.js";

export class Gift extends Model {

    /**
     * @type {string}
     */
    id_person;
    /**
     * @type {number}
     */
    annee;

    /**
     * @type {string}
     */
    description;

    validate(data) {


        if (data.id_person instanceof Person) {
            data.id_person = data.id_person.id;
        }

        if (!isString(data.id_person) || isEmpty(data.id_person)) {
            throw new TypeError('Invalid Person id');
        }
        if (!isNumeric(data.annee)) {
            throw new TypeError('Invalid Gift year');
        }

        data.annee = parseInt(data.annee);

        if (!isString(data.description) || isEmpty(data.description)) {
            throw new TypeError('Invalid Gift description');
        }
    }

    /**
     *
     * @returns {Person}
     */
    get person() {
        return Person.findById(this.id_person);
    }

    extract() {
        return {
            id: this.id,
            id_person: this.id_person,
            annee: this.annee,
            description: this.description
        };
    }
}

Model.register(new Gift);