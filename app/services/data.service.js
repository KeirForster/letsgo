angular
    .module('app')
    .factory('dataService', dataService);

dataService.$inject = ['$http', '$q', '$log'];

function dataService($http, $q, $log)
{
    let eventLocation = null;
    let eventDate = null;
    let eventCategory = null;

    return {
        getEvents          : getEvents,
        setEventLoc   : setEventLoc,
        getEventLoc   : getEventLoc,
        setEventDate       : setEventDate,
        getEventDate       : getEventDate,
        setEventCategory   : setEventCategory,
        getEventCategory: getEventCategory
    };

    function setEventLoc(loc)
    {
        eventLocation = loc;
    }

    function getEventLoc()
    {
        return eventLocation ? $q.resolve(eventLocation) : $q.reject('event location not found');
    }

    function setEventDate(date)
    {
        eventDate = date;
    }

    function getEventDate()
    {
        return eventDate ? $q.resolve(eventDate) : $q.reject('event date not found');
    }

    function setEventCategory(cat)
    {
        eventCategory = cat;
    }

    function getEventCategory()
    {
        return eventCategory ? $q.resolve(eventCategory) : $q.reject('event category not found');
    }

    function getEvents()
    {
        var oArgs = {
            app_key    : "bqM8kJmJmnF2QPJm",
            category   : eventCategory || '',
            location   : eventLocation.locality || 'Vancouver',
            sort_order : 'relevance',
            when: eventDate.formatted || 'future',
            page_size  : 50, // default 50
            page_number: 1,
            sort_order : "popularity",
        };

        return new Promise(function(resolve, reject)
        {
            EVDB.API.call("/events/search", oArgs, function(oData)
            {
                // Note: this relies on the custom toString() methods below
                $log.log(oData);
                resolve(oData);
            });
        });
    }
}

