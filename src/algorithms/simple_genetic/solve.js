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
        let group = this.group
        let cross_number = Math.floor(group.length*this.info.cross_probability)
        let part_length = Math.floor(this.city_number * 0.4)
        for(let k = 0; k < cross_number; ++k){
            let i = Math.floor(Math.random()*group.length)
            let j = Math.floor(Math.random() * group.length)
            let temp = group[i]
            group[i] = group[i].slice(0, part_length).concat(group[j].filter(x=>group[i].slice(part_length).findIndex(y=>x==y)!=-1))
            group[j] = group[j].slice(0, part_length).concat(temp.filter(x=>group[j].slice(part_length).findIndex(y=>x==y)!=-1))
        }
    }
    
    mutate() {
        let group = this.group
        group.forEach(element => {
            if (Math.random() < this.info.mutation_probability){
                let i = Math.floor(Math.random() * element.length);
                let j = Math.floor(Math.random() * element.length);
                [element[i], element[j]] = [element[j], element[i]]
            }
        });
    }
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
        this.generation++
        return this.generation >= this.info.max_generation
    }
}

export default Genetic