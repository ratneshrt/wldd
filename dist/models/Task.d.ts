import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        title: string;
        status: "pending" | "completed";
        owner: mongoose.Types.ObjectId;
        description?: string | null;
        duedate?: NativeDate | null;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        createdAt: NativeDate;
        title: string;
        status: "pending" | "completed";
        owner: mongoose.Types.ObjectId;
        description?: string | null;
        duedate?: NativeDate | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    title: string;
    status: "pending" | "completed";
    owner: mongoose.Types.ObjectId;
    description?: string | null;
    duedate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Task.d.ts.map