<?php 

function calc($x){
    try {
       return 1/$x;
    } catch (Throwable $e) {
        return 20;
    } finally {
        return 10;
    }
}

var_dump([
    calc(1),
    calc(0)
]);
