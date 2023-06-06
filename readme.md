1. What's a closure? Where in the code is there a closure?

    Closure is a function/method that returns another function/method... 
    Generally used for handle JS Scopes, To apply Dependency Inversion, or create generic function that can be reused within a lot of kind of domains.

2. Which are the potential side-effects in any function? Could you point out any of these cases inyour code? Are they expected? Can they be avoided ?

    Performance Issues : 
        -   Use a Function to return a processed data and bind it on framework template engine... 
            -   as it is a function, everytime you call it, the function run somekind of processing... you can handle it to avoid this processing blow working with memory pointers (indexation/cache), or using "computed" hook (a kind of cache hook that vue provide to us).

    Memory Overflow :
        -   recursive functions without all coded conditional points of return can throw memory overflow exception...

    In my code : PlanetVue.vue:line 102 (function isLoading).
    Expected : Yes
    Avoided : Yes, i coded in a way that will not throw an exception... as more data you add in the property that is being acessed on by the function, the higher the cost of processing... devs must avoid to add a lot of data in this propery.
