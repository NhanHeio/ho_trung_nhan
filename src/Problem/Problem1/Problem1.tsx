 export const sum_to_n_a = (n: number): number => {
    /*
    *  Loop from 1 to n and sum them
    *
    * */
    let result: number = 0;
    for (let i = 1; i <= n; i++ ) {
        result = result + i;
    }
    return result;
}
 export const sum_to_n_b = (n: number): number => {
    /*
    * Formula
    *
    * */
    return (n*(n+1))/2
}

 export const sum_to_n_c = (n: number): number => {
    /*
    * recursive funtion
    * */
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1)
}