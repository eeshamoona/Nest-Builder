import io

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials



def download_file(file_id, oauth_token):
    """Downloads a file
    Args:
        file_id: ID of the file to download
        oauth_token: OAuth token to authenticate the request
    Returns : IO object with location.
    """
    creds = Credentials(oauth_token)
    try:
        # create drive api client
        service = build("drive", "v3", credentials=creds)

        # pylint: disable=maybe-no-member
        request = service.files().get_media(fileId=file_id)
        file = io.BytesIO()
        downloader = MediaIoBaseDownload(file, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}.")

    except HttpError as error:
        print(f"An error occurred: {error}")
        file = None

    return file.getvalue()