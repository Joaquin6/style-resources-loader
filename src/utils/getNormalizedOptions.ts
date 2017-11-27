import { loader } from 'webpack';
import { getOptions } from 'loader-utils';

import { StyleResourcesInjector, StyleResourcesLoaderOptions, StyleResourcesLoaderOriginalOptions } from '../';
import { isString } from './';

export function getNormalizedOptions(
    this: loader.LoaderContext,
    callback: loader.loaderCallback,
): StyleResourcesLoaderOptions | void {
    const defaultInjector: StyleResourcesInjector = (source, resources) =>
        resources.map(({ content }) => content).join('') + source;

    const defaultResolveUrl = true;

    const {
        patterns,
        injector = defaultInjector,
        resolveUrl = defaultResolveUrl,
    }: StyleResourcesLoaderOriginalOptions = getOptions(this) || {};

    if (!isString(patterns) && !(Array.isArray(patterns) && patterns.every(isString))) {
        return callback(new TypeError(
            '[style-resources-loader] Expected options.patterns to be a string or an array of string. '
            + `Instead received ${typeof patterns}.`,
        ));
    }

    if (typeof injector !== 'function') {
        return callback(new TypeError(
            '[style-resources-loader] Expected options.injector to be a function. '
            + `Instead received ${typeof injector}.`,
        ));
    }

    if (typeof resolveUrl !== 'boolean') {
        return callback(new TypeError(
            '[style-resources-loader] Expected options.resolveUrl to be a boolean. '
            + `Instead received ${typeof resolveUrl}.`,
        ));
    }

    return {
        patterns,
        injector,
        resolveUrl,
    };
}