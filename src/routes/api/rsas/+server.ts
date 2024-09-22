import fs from 'fs';
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { json } from '@sveltejs/kit';
import { RSAS_FILE_PATH, RSAS_DOCKER_VOLUME } from "$env/static/private";
import { exec } from "child_process";

const appName = 'rsas';

export async function GET() {
    const path = RSAS_FILE_PATH;
    let content = "";

    content = await readFile(path);

    const parser = new XMLParser();
    const jObj = parser.parse(content);

    return json(jObj);
}

export async function POST({ request }) {

    try {
        const path = RSAS_FILE_PATH;
        const rsasVolumePath = RSAS_DOCKER_VOLUME;
        const data = await request.json();

        const builder = new XMLBuilder();
        const xmlContent = builder.build(data);

        writeFile(path, xmlContent);
        writeFile(rsasVolumePath, xmlContent);
        checkAndStopProcess();
    } catch (error) {
        return json({ error: 'Invalid request body', body: await request.json() }, { status: 400 });
    }

    return json({ message: 'Ok' }, { status: 200 });
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
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

const reloadRsasCommand = `
pids=$(pgrep -f rsas)
if [ -n "$pids" ]; then
  for pid in $pids; do
    echo "Killing process rsas $pid"
    kill -SIGTERM "$pid";
  done
else
  echo "No processes found matching rsas";
fi`;

// Function to check if a process is running
function checkAndStopProcess() {
    exec(`/bin/bash -c '${reloadRsasCommand}'`, (error, stdout) => {
        if (error) {
            console.error(`Error checking for:`, error);

            return;
        } else {
            console.log("reloaded rsas", stdout);
        }
    });

    exec(`rsas -b -c /new.xml`, (error, stdout) => {
        if (error) {
            console.error(`Error checking for`, error);

            return;
        } else {
            console.log("reloaded rsas", stdout);
        }
    });
}
