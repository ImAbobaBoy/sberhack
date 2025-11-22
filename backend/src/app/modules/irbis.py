import asyncio
import sys

from cbsvibpyirbis import BRIEF, Connection
from cbsvibpyirbis.records.record import Record


class IrbisClient:
    def __init__(
        self,
        host: str,
        port: int,
        username: str,
        password: str,
        database: str,
    ) -> None:
        self.client = Connection(
            host=host,
            port=port,
            username=username,
            password=password,
            database=database,
        )

    async def connect_async(self) -> None:
        await asyncio.to_thread(self.client.connect_async)

    def disconnect(self) -> None:
        self.client.disconnect()

    def search(self, query: str) -> list[int]:
        return self.client.search(query)

    def read_record(self, mfn: int) -> Record | None:
        return self.client.read_record(mfn)

    def format_record(self, format_spec: str, mfn: int) -> str:
        return self.client.format_record(format_spec, mfn)

# Connect to the server
client = Connection(
    host="212.23.72.121",
    port=6666,
    username="1",
    password="1",
    database="RDR",
)
client.connect()

if not client.connected:
    print("Can't connect")
    sys.exit(1)

# Search for books written by Byron
found = client.search('"A=$"')
print(f'Records found: {len(found)}')

# Take first 10 records
for mfn in found[:10]:
    # Read the record from the server
    record = client.read_record(mfn)

    # Extract the field and subfield from the record
    title = record.fm(200, 'a')
    print(f'Title: {title}')

    # Format the record by the server
    description = client.format_record(BRIEF, mfn)
    print(f'Description: {description}')

    print()  # Print empty line

# Disconnect from the server
client.disconnect()
