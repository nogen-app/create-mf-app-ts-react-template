/**
 * This is the recommended solution to eager imports with Webpack and Module
 * Federation. We are using a dynamic import of a bootstrap file, as doing so
 * will not create any additional Round Trips. It is also more performant in
 * general as initialisation of code is split out of a larger chunk,
 */
import('./bootstrap');
