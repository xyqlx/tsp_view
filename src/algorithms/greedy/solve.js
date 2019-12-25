class Greedy{
    constructor(parameters){
        this.info = parameters
        let dataset = this.info.dataset
        let len = dataset.length
        this.city_number = len
        this.route = Array(len).fill(0).map(() => Array(len).fill(0))
        for (let i = 0; i < this.route.length; ++i) {
            for (let j = 0; j < i; ++j) {
                this.route[i][j] = this.route[j][i] = Math.sqrt(
                    Math.pow(dataset[i][0] - dataset[j][0], 2) +
                    Math.pow(dataset[i][1] - dataset[j][1], 2)
                )
            }
            this.route[i][i] = 0;
        }
        this.init()
    }
    route_length = (route) => {
        let sum = this.route[route[route.length - 1]][route[0]]
        for (let i = 1; i < this.city_number; ++i) {
            sum += this.route[route[i - 1]][route[i]];
        }
        return sum
    }
    init = ()=>{
        this.generation = 0
        let cities = this.route.length
        
        let path = [0]
        let current = 0
        let temp = -1
        for(let i = 0; i < cities - 1; ++i){
            temp = -1
            let next = -1
            for(let j = 0; j < cities; ++j){
                if (path.findIndex(x=>x==j)==-1){
                    if (temp == -1 || temp > this.route[current][j]){
                        next = j
                        temp = this.route[current][j]
                    }
                }
            }
            current = next
            path.push(current)
        }
        this.best_route = path
        this.best_route_length = this.route_length(path)
    }
    step(){
        this.generation++
        return false
    }
}

export default Greedy
