import {fakerFR as faker} from "@faker-js/faker";
import {Person} from "@/models/Person";
import {Gift} from "@/models/Gift";


export function makeFakeData(max = 10) {
    if (Person.findAll().length === 0) {
        for (let _ = 0; _ < max; ++_) {
            const _person = new Person;
            _person.name = faker.person.fullName();
            _person.birthday = faker.date.past({years: 80});
            // _person.photo = faker.image.urlPicsumPhotos({width: 200, height: 150});
            // _person.photo = faker.image.urlLoremFlickr({ width: 320, height: 240 });
            Person.add(_person);

            for (let __ = 0; __ < Math.ceil(Math.random() * _person.age); ++__) {
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
