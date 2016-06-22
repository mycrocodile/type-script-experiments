// Generics:
class GenericList<T> {
	list: T[]
	constructor() { }
} 

class RESTService {
	apiUrl: string = "/api"
	constructor(public entityConstructor = {}) { }
	getId(entity){
		if('id' in entity){
			return entity['id']
		} else if('getId' in entity){
			return entity['getId']()
		} else if('getId' in this.entityConstructor){
			return this.entityConstructor['getId'](entity)
		} else {
			return undefined
		} 
	}
	useGetIdMethod(entity){
		let value = this.getId(entity);
		console.log(value) 
		return value;
	}
}

// Implementstion:
class Treshold {
    weatherParameter: string;
    thresholdBelowOrAbove: string;
    threshold: number;

	static getId(o: Treshold): string {
		if(o.weatherParameter && o.thresholdBelowOrAbove && o.threshold){
			return `${o.weatherParameter}_${o.thresholdBelowOrAbove}_${o.threshold}`
		}
		return undefined
	}
	static isNew(o){
		return o.getId()
	}
}

class TresholdList extends GenericList<Treshold> {
	constructor(public service){
		super()
	}
	useSrv() {
		this.service.useGetIdMethod(this.list[0]);
	}
}

class TresholdService extends RESTService {
	constructor() {
		super(Treshold)
	}
	// getId(itm) {
	// 	return Treshold.getId(itm) + "-YYY";
	// }	
}

// 
let trSrv = new TresholdService() 
let trLst = new TresholdList(trSrv)

let hash = {
    weatherParameter: "a",
    thresholdBelowOrAbove: "b",
    threshold: 22
}

trLst.list=[hash];

let lst = trLst.useSrv()
let srv = trSrv.useGetIdMethod(hash)
//

class ClassA {
	id: string
	v1: string
	v2: string
}
class ClassAService extends RESTService {
}

class ClassBService extends RESTService {
	getId(entity) {
		return "entityId"
	}
}

class ClassC {
	v1: string
	v2: string
	
	static getId(entity){
		return `${entity.v1}-${entity.v2}`
	}
}
class ClassCService extends RESTService {
	constructor() {
		super(ClassC)
	}
}

let aSrv = new ClassAService();
aSrv.useGetIdMethod({v1:"w1",v2:"w2",id:"TTT"}) // => "TTT"
aSrv.useGetIdMethod({v1:"w1",v2:"w2",getId(itm){return "id4"}}) // => "id4"
aSrv.useGetIdMethod({v1:"w1",v2:"w2"}) // => "undefined"

let bSrv = new ClassBService();
bSrv.useGetIdMethod({v1:"w1",v2:"w2"}) // => "entityId"

let cSrv = new ClassCService();
cSrv.useGetIdMethod({v1:"w1",v2:"w2"}) // => "w1-w2"
 
