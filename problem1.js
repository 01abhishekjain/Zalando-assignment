'use strict';

/* global CustomError, getLikedBrands, getTopBrandsForGender */

function solution(U, N) {
    return new Promise((resolve, reject) => {
        // Resolve the promise with the result
        var output = [];

        var liked = getLikedBrands(U.id)
            .then(fillLiked.bind(null, resolve, reject, output, N))
            .catch(err => output.likedBrandsHandled = true);

        var genderTop = getTopBrandsForGender(U.gender)
            .then(fillGenderTop.bind(null, resolve, reject, output, N))
            .catch(err => output.topBrandsForGenderHandled = true);
    });
}

function fillLiked(resolve, reject, output, N, liked) {
    if (liked.length >= N) return resolve(liked.slice(0, N).map(brand => brand.name));
    else output.unshift(...liked.map(brand => brand.name));

    if (output.topBrandsForGenderHandled) removeDups(resolve, reject, output, N);

    output.likedBrandsHandled = true;
}

function fillGenderTop(resolve, reject, output, N, genderTop) {
    output.push(...genderTop.map(brand => brand.name));

    if (output.likedBrandsHandled) removeDups(resolve, reject, output, N);

    output.topBrandsForGenderHandled = true;
}

function removeDups(resolve, reject, output, N) {
    if (output.length < N) return reject(CustomError);
    else {
        for (var i = output.length - 1; i >= 0; i--) {
            var idx = output.indexOf(output[i]);
            if (idx !== i) delete output[i];
        }
        output = output.filter(brandName => brandName !== undefined);
        if (output.length >= N) resolve(output.slice(0, N).map(brand => brand.name));
        else reject(CustomError);
    }
}
