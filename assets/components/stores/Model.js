import {encode, getClass, isEmpty, isFunction, isPlainObject, isString, uniqid} from "../../utils/utils.mjs";
import LocalStore from "./webstore.mjs";
import Datastore from "./datastore.mjs";


const
    entities = new Map,
    hooks = new Map,
    models = {};
let datastore;


function hydrateModel(type, data, validate = true) {

    if (!models[type]) {
        throw new TypeError(`Invalid Model type ${type}`);
    }

    const i = Object.create(models[type]);
    if (isEmpty(data.id)) {
        data.id = uniqid();
    } else {
        uniqid.add(data.id);
    }

    validate && i.validate(data);
    for (let prop in data) {
        i[prop] = data[prop];
    }
    return i;
}


function initializeModel(model) {

    const type = getClass(model);

    if (! hooks.has(type) ) {

        // initialize entity cache localStorage
        model.dataStore.getItem(model.key, () => []).forEach(item => {
            const entity = hydrateModel(type, item);
            entities.set(entity.id, entity);
        });
        hooks.set(type, model.dataStore.hook(model.key, []));
    }

}


/**
 * A Base Model that Uses a DataStore as Database
 *
 * @abstract
 */
export default class Model {


    /**
     * @return {Datastore}
     */
    static get dataStore() {
        return datastore ??= LocalStore;
    }

    static set dataStore(/** @type DataStore */ store) {

        if (!(store instanceof Datastore)) {
            throw new TypeError('Invalid DataStore');
        }
        datastore = store;
    }

    /**
     * @return {string}
     */
    static get key() {
        return 'Model' + getClass(this);
    }

    /**
     * @type {string|null}
     */
    id = null;


    static get hook() {
        const type = getClass(this);
        if (type === 'Model') {
            throw new Error('Cannot use Model.hook directly.');
        }

        initializeModel(this);
        return hooks.get(type);
    }

    /**
     * Register an instance of model to be able to hydrate it
     * @param {Model} model
     */
    static register(model) {

        if (!(model instanceof Model)) {
            throw new TypeError('Invalid model supplied.');
        }
        models[getClass(model)] = model;

    }

    /**
     * @param {Model|object} data
     */
    static add(data = {}) {

        const type = getClass(this);

        if (type === 'Model') {
            throw new Error('Cannot call Model.add() directly.');
        }

        if (isPlainObject(data) && !isEmpty(data)) {
            data = hydrateModel(type, data, false);
        }

        initializeModel(this);

        if (getClass(data) === getClass(this)) {

            if (isEmpty(data.id)) {
                data.id = uniqid();
            }

            if (!entities.has(data.id)) {
                data.validate(data);
                entities.set(data.id, data);
                // update localstorage
                this.hook.set(this.findAll().map(x => x.extract()));
            }
        }

    }


    /**
     * @param {Model} entity
     */
    static update(entity) {
        const type = getClass(this);

        if (type === 'Model') {
            throw new Error('Cannot call Model.update() directly.');
        }

        if (!(entity instanceof Model)) {
            throw new TypeError('Invalid entity provided');
        }

        if (!entity.id) {
            throw new TypeError(`${type}.id is not defined.`);
        }

        initializeModel(this);
        entity.validate(entity);
        entities.set(entity.id, entity);
        // update storage
        this.hook.set(this.findAll().map(x => x.extract()));

    }

    /**
     * @param {string|object} id
     * @return {Model|null}
     */
    static findById(id) {

        if (getClass(this) === 'Model') {
            throw new Error('Cannot call Model.add() directly.');
        }

        if(typeof id === 'object' && null !== id){
            id = id.id;
        }

        if (!isString(id) || isEmpty(id)) {
            throw new TypeError(`Invalid argument id`);
        }

        initializeModel(this);

        const result = entities.get(id);

        if (getClass(result) === getClass(this)) {
            return result;
        }

        return null;
    }

    /**
     * @return {Model[]}
     */
    static findAll() {
        if (getClass(this) === 'Model') {
            throw new Error('Cannot call Model.add() directly.');
        }
        initializeModel(this);

        const type = getClass(this);
        return [...entities.values()].filter(
            item => getClass(item) === type
        );
    }

    /**
     * @param {function|object} constrain
     * @return {Model[]}
     */
    static find(constrain = {}) {


        if (isFunction(constrain)) {
            return this.findAll().filter(constrain);
        }

        if (isPlainObject(constrain)) {

            let all = this.findAll();

            if (isEmpty(constrain)) {
                return all;
            }

            for (let prop in constrain) {
                const value = constrain[prop];
                if (isFunction(value)) {
                    all = all.filter(item => value(item[prop]));
                } else {
                    all = all.filter(item => encode(item[prop]) === encode(value));
                }
            }

            return all;
        }

        throw new TypeError('Invalid constrain provided');
    }




    /**
     * @abstract
     * @param {Object|Model} data
     * @return {void}
     */
    validate(data) {
        throw new TypeError(getClass(this) + 'validate() not implemented');
    }

    /**
     * @abstract
     * @return {object}
     */
    extract() {
        throw new Error(getClass(this) + '.extract() not implemented');
    }
}