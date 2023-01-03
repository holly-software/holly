export class Table {
	readonly #rows: string[][];

	constructor(rows: string[][]) {
		this.#rows = rows;
	}

	get rows(): string[][] {
		return this.#rows;
	}

	static build<T, Cols extends string[]>(
		data: T[],
		opt: {
			columns: Cols;
			extract: (datum: T) => { [key in Cols[number]]: string };
		}
	): Table {
		const { columns, extract } = opt;

		const rows: string[][] = [];

		rows.push(columns);

		for (const datum of data) {
			const row: string[] = [];

			const extracted = extract(datum);
			for (const column of columns) {
				row.push(extracted[column as Cols[number]]);
			}

			rows.push(row);
		}

		return new Table(rows);
	}

	serialize(format: SerializationFormat): {
		asString: () => string;
		asBlob: () => Blob;
		asURL: () => string;
	} {
		const serialized = format.serialize(this);

		return {
			asString: () => serialized,
			asBlob: () => new Blob([serialized], { type: format.mimeType }),
			asURL: () =>
				URL.createObjectURL(new Blob([serialized], { type: format.mimeType })),
		};
	}
}

export interface SerializationFormat {
	mimeType: string;
	serialize(table: Table): string;
}

export const CSV: SerializationFormat = {
	mimeType: "text/csv",
	serialize(table) {
		return table.rows
			.map((row) => row.join(","))
			.join("\n");
	},
};
