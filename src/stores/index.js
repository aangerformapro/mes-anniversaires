import {defineStore} from "pinia";
import
{
    isEmpty,
    isNumeric,
    isString
} from "../../assets/utils/utils.mjs";
import {fakerFR as faker} from "@faker-js/faker";
import Model from "../../assets/utils/model.mjs";
import {ref} from "vue";


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

    validate(data) {

        if (!isString(data.name) || isEmpty(data.name)) {
            throw new TypeError('Invalid Person name');
        }

        if (isString(data.birthday)) {
            data.birthday = new Date(data.birthday);
        }

        if (!(data.birthday instanceof Date)) {
            throw new TypeError('Invalid birthday, not an instance of Date');
        }

        if (isEmpty(data.photo)) {
            data.photo = DEFAULT_PICTURE;
        }

        if (!isString(data.photo) || isEmpty(data.photo)) {
            throw new TypeError('Invalid Person photo');
        }


    }

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


export function makeFakeData(max = 10) {
    if (Person.findAll().length === 0) {

        for (let _ = 0; _ < max; ++_) {

            const _person = new Person;
            _person.name = faker.person.fullName();
            _person.birthday = faker.date.past({years: 80});
            _person.photo = faker.image.urlLoremFlickr({width: 320, height: 240});
            Person.add(_person);

            for (let __ = 0; __ < Math.ceil(Math.random() * max); ++__) {
                const _gift = new Gift, desc = [
                    faker.vehicle.vehicle(),
                    faker.commerce.product(),
                    faker.animal.type(),

                ];
                _gift.id_person = _person;
                _gift.annee = faker.date.past({years: 79}).getFullYear();
                _gift.description = desc[Math.floor(Math.random() * desc.length)];
                Gift.add(_gift);
            }
        }
    }
}


export const usePersonsStore = defineStore('persons', () => {

    const persons = ref(
        Person.findAll()
    );

    Person.hook.subscribe(list => persons.value = list.map(x => Person.findById(x.id)));

    function add(person) {
        Person.add(person);
    }

    return {persons, add};
});


export const useGiftStore = defineStore('gifts', () => {

    const gifts = ref([]);

    Gift.hook.subscribe(list => gifts.value = list.map(x => Gift.findById(x.id)));

    function add(gift) {
        Gift.add(gift);
    }

    return {gifts, add};
});