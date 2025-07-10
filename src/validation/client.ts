// biome-ignore lint/performance/noBarrelFile: This is a package entrypoint
// biome-ignore lint/performance/noReExportAll: This is the cleanest way to do this
export * from './dtos/exception.dto.js';
export { ExceptionCode as _ExceptionCode } from './enums/exceptions.enum.js';
