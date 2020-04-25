apiKey = 'R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';
queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?/&api-key=' + apiKey;
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M&fq=headline:(%27coronavirus%27)

searchArticles = (e) => {
    e.preventDefault();

    var keyword = $('#termInput').val().trim();
    var numRecords = $('.numRecords option:selected').attr('value');
    console.log(numRecords);
    var startYear = $('#startYear').val().trim();
    var endYear = $('#endYear').val().trim();

    if (keyword !== "") {
        var headlineParam = '&fq=headline:(' + keyword + ')';
        queryURL = queryURL + headlineParam;
        console.log(queryURL);
    } 
    // Need to update with the right endpoint for URL
    if (startYear !== "") {
        var startYrParam = '&fq=headline:(' + keyword + ')';
        queryURL = queryURL + startYrParam;
    } 

    // Need to update with the right endpoint for URL
    if (endYear !== "") {
        var endYrParam = '&fq=headline:(' + keyword + ')';
        queryURL = queryURL + endYrParam;
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        for (var t = 0; t <= numRecords; t++) {
            var articleLink = response.response.docs[t].web_url
            var articleDiv = `
                <div class="card-header d-flex flex-row" style="background: #ecf0f1">
                    <span class="badge badge-dark p-2 align-self-center ">${t + 1}</span>
                    <h4 class="ml-3"><a class="text-dark" target="_blank" href="${articleLink}">${response.response.docs[t].headline.main}</a></h4>
                </div>
            `
            $('#articles').append(articleDiv);
        }

    })
} 

clearResults = () => {
    $('#articles').clear();
}

$('#searchBtn').on('click', searchArticles);
$('#clearBtn').on('click', clearResults);