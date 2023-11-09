type HasChanged<Type> = ((value: Type, oldValue: Type) => boolean);

export default HasChanged;
