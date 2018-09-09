export default class Utils {
    static excludeObjectKey(object, excludeKey) {
        let {[excludeKey]: excluded, ...excludedObject} = object;
        return excludedObject;
    }
}