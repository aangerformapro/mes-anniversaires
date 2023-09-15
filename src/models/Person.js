import {isEmpty, isNumeric, isString} from "../../assets/utils/utils.mjs";
import {Gift} from "./Gift.js";
import Model from "../../assets/components/stores/Model.js";

const DEFAULT_PICTURE = './assets/pictures/avatar.svg';



export class Person extends Model {

    /**
     * @type {string}
     */
    name;
    /**
     * @type Date
     */
    birthday;
    /**
     * @type string
     */
    photo;

    get birthdayFr() {
        return this.birthday.toLocaleDateString('fr-FR');
    }

    get next() {
        const
            now = this.nowDate,
            year = now.getUTCFullYear(),
            day = this.birthday.getUTCDate(),
            month = this.birthday.getUTCMonth(),
            next = new Date(year, month, day);
        if (now.getTime() > next.getTime()) {
            next.setUTCFullYear(year + 1);
        }

        return next;
    }

    get nowDate() {
        const now = new Date();
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    }

    get age() {

        const result = Math.floor((this.nowDate.getTime() - this.birthday.getTime()) / (1000 * 60 * 60 * 24 * 365));
        if (0 === this.nextDays) {
            return result + 1;
        }
        return result;

    }

    get nextDays() {
        return Math.min(Math.ceil(
            (this.next.getTime() - this.nowDate.getTime()) / (1000 * 60 * 60 * 24)
        ), 365);
    }


    get nextDaysIntl(){
        const translator = new Intl.RelativeTimeFormat('fr', {style: 'long'});
        return translator.format(this.nextDays, 'day')
    }

    validate(data) {

        if (!isString(data.name) || isEmpty(data.name)) {
            throw new TypeError('Invalid Person name');
        }

        if (isString(data.birthday)) {
            data.birthday = new Date(data.birthday);
        }

        if (!(data.birthday instanceof Date) || data.birthday.toString() === 'Invalid Date') {
            throw new TypeError('Invalid birthday, not an instance of Date');
        }

        if (isEmpty(data.photo)) {
            data.photo = DEFAULT_PICTURE;
        }

        if (!isString(data.photo) || isEmpty(data.photo)) {
            throw new TypeError('Invalid Person photo');
        }
    }

    /**
     * @returns {Gift[]}
     */
    get gifts() {
        return Gift.find({id_person: this.id});
    }

    extract() {
        return {
            id: this.id,
            name: this.name,
            photo: this.photo,
            birthday: this.birthday.toDateString(),
        };
    }
}

Model.register(new Person);