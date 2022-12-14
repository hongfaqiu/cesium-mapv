import babel from 'rollup-plugin-babel';

export default {
	entry: 'index.js',
	format: 'umd',
	moduleName: 'mapv',
	external: [
		'maptalks',
		'openlayers',
    'leaflet',
    'cesium'
	],
  globals: {
    openlayers: 'ol',
    leaflet: 'L',
    maptalks: 'maptalks',
    cesium: 'cesium'
  },
	plugins: [
		babel({
			runtimeHelpers: true
		})
	],
	dest: 'build/mapv.js'
}