import {defineStore} from "pinia";
import {isEmpty, isInt, isNumeric, isString, uniqid} from "../../assets/utils/utils.mjs";
import LocalStore from "../../assets/components/stores/webstore.mjs";

const
    DEFAULT_PICTURE = './assets/pictures/avatar.svg',
    PERSON_KEY = 'person',
    GIFTS_KEY = 'gifts';

const
    persons = new Map,
    gifts = new Map;

export class Person {

    id = '';
    nom = '';
    birthday = new Date();
    photo = '';


    constructor({nom, birthday, photo, id} = {}) {

        this.id = id ?? uniqid();

        if(!isString(nom) || isEmpty(nom)){
            throw new TypeError('Invalid Person name');
        }
        this.nom = nom ;
        if(isString(birthday)){
            birthday = new Date(birthday);
        }
        if(!(birthday instanceof Date)){
            throw new TypeError('Invalid birthday, not an instance of Date');
        }
        this.photo = photo ?? DEFAULT_PICTURE;

        if(!persons.has(this.id)){
            persons.set(this.id, this);

            if(!gifts.has(this)){
                gifts.set(this, new Set);
            }
        }

    }

    extract(){
        return {
            id: this.id,
            nom: this.nom,
            photo: this.photo,
            birthday: this.birthday.toJSON( )
        }
    }
}

export class Gift {
    id = '';
    id_person = '';
    annee = 0;
    description = '';

    constructor({id, id_person, annee, description} = {}) {

        this.id = id ?? uniqid();

        if(id_person instanceof Person){
            id_person = id_person.id;
        }

        if(!isString(id_person) || isEmpty(id_person)){
            throw new TypeError('Invalid Person id');
        }
        if(!isNumeric(annee)){
            throw new TypeError('Invalid Gift year');
        }

        if(!isString(description) || isEmpty(description)){
            throw new TypeError('Invalid Gift description');
        }

        this.id_person = id_person;
        this.annee = parseInt(annee);
        this.description = description;

        const current = gifts.get(this.person);
        current.add(this);
        gifts.set(this.person, current);


    }


    get person(){

        if(!persons.has(this.id_person)){
            throw new Error('Invalid Gift, person does not exists.');
        }

        return persons.get(this.id_person);
    }

    extract(){
        return {
            id: this.id,
            id_person: this.id_person,
            annee: this.annee,
            description: this.description
        }
    }


}



function loadDataStore(){
    if(persons.size){
        return;
    }
    LocalStore.getItem(PERSON_KEY, [])
        .forEach(item=> new Person(item));

    LocalStore.getItem(GIFTS_KEY, [])
        .forEach(item=>new Gift(item));

}

function saveDataStore(){

    const people = [], presents = [];

    for(let item of persons.values()){
        people.push(item);
        for(let _item of gifts.get(persons)){
            presents.push(_item);
        }
    }
    LocalStore.setItem(PERSON_KEY, people);
    LocalStore.setItem(GIFTS_KEY, presents);

}



 export const usePersonnes = defineStore(
     'personnes',
 {

     }
 );