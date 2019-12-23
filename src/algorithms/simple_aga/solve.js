class Genetic{
    constructor(parameters){
        this.info = parameters
        let dataset = this.info.dataset
        let len = dataset.length
        this.city_number = len
        this.route = Array(len).fill(0).map(() => Array(len).fill(0))
        for(let i = 0; i < this.route.length; ++i){
            for(let j = 0; j < i; ++j){
                this.route[i][j] = this.route[j][i] = Math.sqrt(
                    Math.pow(dataset[i][0]-dataset[j][0], 2)+
                    Math.pow(dataset[i][1] - dataset[j][1], 2)
                )
            }
            this.route[i][i] = 0; 
        }
        this.init()
    }
    init() {
        let group = Array(this.info.group_population).fill(0).map(() => [...Array(this.city_number).keys()])
        group.forEach(element => {
            for (let i = element.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = element[i]
                element[i] = element[j]
                element[j] = temp
            }
        });
        this.group = group
        
        this.fitness_values = Array.from(this.group, this.fitness);
        this.best_route = this.group[this.fitness_values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)];
        this.max_fitness = this.fitness(this.best_route)
        this.generation = 0
    }
    fitness = (route)=>{
        let sum = this.route[route[route.length-1]][route[0]]
        for(let i = 1; i < this.city_number; ++i){
            sum += this.route[route[i-1]][route[i]];
        }
        return 1/sum
    }
    route_length = (route) => {
        let sum = this.route[route[route.length - 1]][route[0]]
        for (let i = 1; i < this.city_number; ++i) {
            sum += this.route[route[i - 1]][route[i]];
        }
        return sum
    }

    select() {
        let sum = this.fitness_values.reduce((x, y) => x + y, 0);
        this.average_fitness = sum/this.info.group_population
        let select_proberbilitys = Array.from(this.fitness_values, x => x / sum);
        let selected_ids = Array.from({ length: this.info.group_population })
        for (let i = 0; i < this.info.group_population; ++i) {
            let random_number = Math.random();
            selected_ids[i] = this.info.group_population - 1;
            for (let j = 0; j < this.info.group_population - 1; ++j) {
                random_number -= select_proberbilitys[j];
                if (random_number < 0) {
                    selected_ids[i] = j;
                    break;
                }
            }
        }
        this.group = Array.from(selected_ids, (id, ) => this.group[id]);
    }

    cross() {
        let part_length = Math.floor(this.city_number * 0.4)
        let mask = [...Array(this.info.group_population).keys()]
        mask.forEach(element => {
            for (let i = element.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [element[i], element[j]] = [element[j], element[i]]
            }
        });
        let group = this.group
        for(let k = 0; k < this.info.group_population/2-1; ++k){
            let i = mask[k*2]
            let j = mask[k*2+1]
            let f = this.fitness(group[i])
            if(this.fitness(group[j]) > f){
                f = this.fitness(group[j])
            }
            let pc = this.info.cross_probability;
            // window.console.log('x')
            // window.console.log(f)
            // window.console.log(this.average_fitness)
            if(f > this.average_fitness){
                pc = this.info.cross_adaption * (this.max_fitness-f) / (this.max_fitness - this.average_fitness)
            }
            // window.console.log(pc)
            // window.console.log(pc)
            if(Math.random() > pc){
                continue;
            }
            let temp = group[i]
            group[i] = group[i].slice(0, part_length).concat(group[j].filter(x=>group[i].slice(part_length).findIndex(y=>x==y)!=-1))
            group[j] = group[j].slice(0, part_length).concat(temp.filter(x=>group[j].slice(part_length).findIndex(y=>x==y)!=-1))
        }
        
    }
    
    // cross() {
    //     let group = this.group
    //     let cross_number = Math.floor(group.length * this.info.cross_probability)
    //     let part_length = Math.floor(this.city_number * 0.4)
    //     for (let k = 0; k < cross_number; ++k) {
    //         let i = Math.floor(Math.random() * group.length)
    //         let j = Math.floor(Math.random() * group.length)
    //         let temp = group[i]
    //         group[i] = group[i].slice(0, part_length).concat(group[j].filter(x => group[i].slice(part_length).findIndex(y => x == y) != -1))
    //         group[j] = group[j].slice(0, part_length).concat(temp.filter(x => group[j].slice(part_length).findIndex(y => x == y) != -1))
    //     }
    // }

    mutate() {
        let group = this.group
        group.forEach((element) => {
            let pm = this.info.mutation_probability
            let f = this.fitness(element)
            if(f > this.average_fitness){
                pm = this.info.mutation_adaption * (this.max_fitness - f) / (this.max_fitness - this.average_fitness)
            }
            // window.console.log('x')
            // window.console.log(f)
            // window.console.log(pm)
            // window.console.log(this.average_fitness)
            if (Math.random() < pm){
                let i = Math.floor(Math.random() * element.length);
                let j = Math.floor(Math.random() * element.length);
                [element[i], element[j]] = [element[j], element[i]]
            }
        });
    }
    // mutate() {
    //     let group = this.group
    //     group.forEach(element => {
    //         if (Math.random() < this.info.mutation_probability) {
    //             let i = Math.floor(Math.random() * element.length);
    //             let j = Math.floor(Math.random() * element.length);
    //             [element[i], element[j]] = [element[j], element[i]]
    //         }
    //     });
    // }

    step(){
        if(this.generation >= this.info.max_generation){
            this.init()
        }
        this.select()
        this.cross()
        this.mutate()
        this.fitness_values = Array.from(this.group, this.fitness) 
        this.best_route = this.group[this.fitness_values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)];
        // window.console.log(this.best_route)
        // window.console.log(this.route_length(this.best_route))
        //this.best_route = []
        // best_route.forEach(x=>this.best_route.push(x))
        this.best_route_length = this.route_length(this.best_route)
        this.max_fitness = this.fitness(this.best_route)
        this.generation++
        return this.generation >= this.info.max_generation
    }
}

export default Genetic