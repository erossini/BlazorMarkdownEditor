using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor
{
    public class ProgressiveStreamContent : StreamContent
    {
        // Define the variables which is the stream that represents the file
        private readonly Stream _fileStream;
        // Maximum amount of bytes to send per packet
        private readonly int _maxBuffer = 1024 * 4;

        public ProgressiveStreamContent(Stream stream, int maxBuffer, Action<long, double> onProgress) : base(stream)
        {
            _fileStream = stream;
            _maxBuffer = maxBuffer;
            OnProgress += onProgress;
        }

        /// <summary>
        /// Event that we can subscribe to which will be triggered everytime after part of the file gets uploaded.
        /// It passes the total amount of uploaded bytes and the percentage as well
        /// </summary>
        public event Action<long, double> OnProgress;

        // Override the SerialzeToStreamAsync method which provides us with the stream that we can write our chunks into it
        protected async override Task SerializeToStreamAsync(Stream stream, TransportContext context)
        {
            // Define an array of bytes with the the length of the maximum amount of bytes to be pushed per time
            var buffer = new byte[_maxBuffer];
            var totalLength = _fileStream.Length;

            // Variable that holds the amount of uploaded bytes
            long uploaded = 0;

            // Create an while loop that we will break it internally when all bytes uploaded to the server
            while (true)
            {
                using (_fileStream)
                {
                    // In this part of code here in every loop we read a chunk of bytes and write them to the stream of the HttpContent
                    var length = await _fileStream.ReadAsync(buffer, 0, _maxBuffer);
                    // Check if the amount of bytes read recently, if there is no bytes read break the loop
                    if (length <= 0)
                    {
                        break;
                    }

                    // Add the amount of read bytes to uploaded variable
                    uploaded += length;
                    // Calculate the percntage of the uploaded bytes out of the total remaining
                    var percentage = Convert.ToDouble(uploaded * 100 / _fileStream.Length);

                    // Write the bytes to the HttpContent stream
                    await stream.WriteAsync(buffer);

                    // Fire the event of OnProgress to notify the client about progress so far
                    OnProgress?.Invoke(uploaded, percentage);

                    // Add this delay over here just to simulate to notice the progress, because locally it's going to be so fast that you can barely notice it
                    await Task.Delay(250);
                }
            }
        }
    }
}