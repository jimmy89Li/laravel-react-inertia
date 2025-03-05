<?php

test('return a successful response', function () {
    $this->get('/')->assertRedirect('/dashboard');
});
