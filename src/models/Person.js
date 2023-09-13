
import {isEmpty, isString} from "../../assets/utils/utils.mjs";
import {Gift} from "./Gift.js";
import Model from "../../assets/components/stores/Model.js";


const DEFAULT_PICTURE = './assets/pictures/avatar.svg';

export class Person extends Model
{

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

    get birthdayFr()
    {
        return this.birthday.toLocaleDateString('fr-FR');
    }

    validate(data)
    {

        if (!isString(data.name) || isEmpty(data.name))
        {
            throw new TypeError('Invalid Person name');
        }

        if (isString(data.birthday))
        {
            data.birthday = new Date(data.birthday);
        }

        if (!(data.birthday instanceof Date))
        {
            throw new TypeError('Invalid birthday, not an instance of Date');
        }

        if (isEmpty(data.photo))
        {
            data.photo = DEFAULT_PICTURE;
        }

        if (!isString(data.photo) || isEmpty(data.photo))
        {
            throw new TypeError('Invalid Person photo');
        }


    }

    /**
     * @returns {Gift[]}
     */
    get gifts()
    {
        return Gift.find({ id_person: this.id });
    }

    extract()
    {
        return {
            id: this.id,
            name: this.name,
            photo: this.photo,
            birthday: this.birthday.toDateString(),
        };
    }
}

Model.register(new Person);