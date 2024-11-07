// src/coffeeFactory.js

export class Coffee {
    constructor(id, name, description, price, region, weight, flavor_profile, grind_option, roast_level, image_url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.region = region;
        this.weight = weight;
        this.flavor_profile = flavor_profile;
        this.grind_option = grind_option;
        this.roast_level = roast_level;
        this.image_url = image_url;
    }
}

export const CoffeeFactory = {
    createCoffee(data) {
        return new Coffee(
            data.id,
            data.name,
            data.description,
            data.price,
            data.region,
            data.weight,
            data.flavor_profile,
            data.grind_option,
            data.roast_level,
            data.image_url
        );
    },
};
