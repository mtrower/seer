package net.blackshard.clarity.seer;
import net.blackshard.clarity.tome.*;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ws.rs.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import java.util.List;

/**
 * This controller retrieves readings from the database.
 *
 * @author mtrower
 * @version 1.0 05/11/16
 */
@Path("/readings")
public class ReadingsController {
    private static final Logger log = LogManager.getLogger(ReadingsController.class);

    @PostConstruct
    public void init() {
        log.debug("opening...");
        // TODO: this also fires on *every GET*... what gives?
        Library.open();
    }

    /**
     * Retrieve readings for the appropriate machine and plugin.
     *
     * @param scribblet name of the scribblet we're interested in.
     * @param machineId machine to retrieve readings for.
     * @return a JSON response containing all readings for machine and scribblet.
     */
    @GET
    @Path("{scribblet}/{machineId}")
    @Produces("application/JSON")
    public String doGet(
            @PathParam("scribblet") String scribblet,
            @PathParam("machineId") Integer machineId) {

        Class scribbletClass = null;
        ReadingDAOHibernate dao = null;
        List<Reading> readings = null;
        Reading reading = null;
        String jsonResponse = "{}";

        // TODO: I don't care for this if block...
        if (scribblet.equals("cpu")) {
            dao = new ReadingDAOHibernate<CPUReading>();
            scribbletClass = CPUReading.class;
        } else if (scribblet.equals("mem")) {
            dao = new ReadingDAOHibernate<MemReading>();
            scribbletClass = MemReading.class;
        }

        // TODO: Let's not handcraft this
        if (scribbletClass == null)
            return "{'errorMessage': 'scribblet not recognized'}";

        readings = dao.getLatest(scribbletClass, 20);

        // TODO: Let's not handcraft this
        try {
            jsonResponse = new ObjectMapper().writeValueAsString(readings);
        } catch (JsonProcessingException jpe) {
            jsonResponse = "{'errorMessage':'error encountered generating JSON'}";
            log.error("", jpe);
        } catch (Exception e) {
            log.error("", e);
            jsonResponse = "{'errorMessage':'Unexpected exception encountered'}";
        }

        return jsonResponse;
    }

    @PreDestroy
    public void destroy() {
        // TODO: why doesn't this work?  It seems to fire when it shouldn't...
        //Library.close();
    }
}
