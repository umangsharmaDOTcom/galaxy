import { mount, createLocalVue } from "@vue/test-utils";
import Attributes from "./Attributes";

jest.mock("app");

import { Services } from "../services";
jest.mock("../services");

Services.mockImplementation(() => {
    return {
        async updateWorkflow() {
            return {};
        },
    };
});

describe("Attributes", () => {
    it("test attributes", async () => {
        const localVue = createLocalVue();
        const wrapper = mount(Attributes, {
            propsData: {
                id: "workflow_id",
                name: "workflow_name",
                tags: ["workflow_tag_0", "workflow_tag_1"],
                parameters: ["workflow_parameter_0", "workflow_parameter_1"],
                versions: ["workflow_version_0"],
            },
            stubs: {
                LicenseSelector: true,
            },
            localVue,
        });
        const name = wrapper.find("#workflow-name");
        expect(name.element.value).toBe("workflow_name");
        wrapper.setProps({ name: "new_workflow_name" });
        await localVue.nextTick();
        expect(name.element.value).toBe("new_workflow_name");
        const parameters = wrapper.findAll(".list-group-item");
        expect(parameters.length).toBe(2);
        expect(parameters.at(0).text()).toBe("1: workflow_parameter_0");
        expect(parameters.at(1).text()).toBe("2: workflow_parameter_1");
    });
});
