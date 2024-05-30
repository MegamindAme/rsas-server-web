import fs from 'fs';
import {XMLParser, XMLBuilder} from "fast-xml-parser";
import { json } from '@sveltejs/kit';

export async function GET() {
    const path = "data/rsas.xml";
    let content = "";

    content = await readFile(path);

    const parser = new XMLParser();
    const jObj = parser.parse(content);

    return json(jObj);
}

export async function POST(event) {
    const {request} = event;

    try {
        const path = "data/rsas_write.xml";
        const data = await request.json();

        const builder = new XMLBuilder();
        const xmlContent = builder.build(data);

        writeFile(path, xmlContent);
    } catch (error) {
        return json({ error: 'Invalid request body', body: await event.request.json() }, { status: 400 });
    }

    return json({message: 'Ok'}, {status: 400});
}

async function writeFile(filePath, data) {
    try {
        await fs.promises.writeFile(filePath, data);
        console.log('File saved successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

async function readFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}