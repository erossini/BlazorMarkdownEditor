namespace MarkdownEditorDemo.Api.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly ILogger<HomeController> _logger;
        /// <summary>
        /// The target folder path
        /// </summary>
        private readonly string _targetFolderPath;

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="config">The configuration.</param>
        public HomeController(ILogger<HomeController> logger, IConfiguration config)
        {
            _logger = logger;

            _targetFolderPath = (string)System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase);
            _targetFolderPath = Path.Combine(_targetFolderPath, "Uploads");
        }

        [HttpGet]
        [Route("{fileType}/{fileName}")]
        public async Task<IActionResult> Download(int fileType, string fileName)
        {
            string ext = FileHelpers.GetExtensionById(fileType);
            if (ext == null)
            {
                _logger.LogInformation($"Extension not found.");
                return BadRequest($"Extension not found.");
            }

            if(ext != Path.GetExtension(fileName))
            {
                _logger.LogInformation($"File not valid.");
                return BadRequest($"File not valid.");
            }

            var trustedFilePath = Path.Combine(_targetFolderPath, fileName).Replace("file:\\", "");
            if (!System.IO.File.Exists(trustedFilePath))
            {
                _logger.LogInformation($"File {trustedFilePath} not exists");
                return NotFound($"File {trustedFilePath} not exists");
            }

            _logger.LogInformation($"Downloading file [{trustedFilePath}].");
            var bytes = await System.IO.File.ReadAllBytesAsync(trustedFilePath);
            return File(bytes, ext.GetMimeTypes(), trustedFilePath);
        }
    }
}
