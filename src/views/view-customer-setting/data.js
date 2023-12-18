import React from "react";
import { Icon } from "semantic-ui-react"

const onClickPayment = (data) => {
    console.log(data)
}

export const picHeader = [
    {
        key: "picName",
        header: "PIC Name"
    },
    {
        key: "picTitle",
        header: "PIC Title"
    },
    {
        key: "phone",
        header: "Phone"
    },
    {
        key: "email",
        header: "Email"
    },
    {
        key: "latestProject",
        header: "Latest Project"
    },
]

export const picData = [
    {
        picName: "Rosa Amalia",
        picTitle: "Branch Manager",
        phone:"08123456789",
        email:"rosaamalia@berca.co.id",
        latestProject:"Project keren banget"
    },
    {
        picName: "Anjar Wahyudi",
        picTitle: "Operational Manager",
        phone:"08123456789",
        email:"anjarwahyudi@berca.co.id",
        latestProject:"Project keren banget"
    },
    {
        picName: "Yoga Zikri Saputra",
        picTitle: "Branch Manager",
        phone:"08123456789",
        email:"yogazikrisaputra@berca.co.id",
        latestProject:"Project keren banget"
    }
]

export const brandHeader = [
    {
        key: "brandName",
        header: "Brand Name"
    },
    {
        key: "years",
        header: "Years"
    },
    {
        key: "purchase",
        header: "% Purchase"
    },
]

export const brandData = [
    {
        brandName: "HP",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
    {
        brandName: "HP",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
    {
        brandName: "HP",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
]

export const serviceHeader = [
    {
        key: "serviceName",
        header: "Service Name"
    },
    {
        key: "years",
        header: "Years"
    },
    {
        key: "purchase",
        header: "% Purchase"
    },
]

export const serviceData = [
    {
        serviceName: "Fiber Internet",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
    {
        serviceName: "Fiber Internet",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
    {
        serviceName: "Fiber Internet",
        years: "2020, 2021, 2022",
        purchase: "80"
    },
]

export const salesHistoryHeader = [
    {
        key: "salesName",
        header: "Sales Name"
    },
    {
        key: "customerName",
        header: "Customer Name"
    },
    {
        key: "yearAssign",
        header: "Year Assign"
    },
]

export const salesHistoryData = [
    {
        salesName: "Rosa Amalia",
        customerName: "PT HAWLETT",
        yearAssign: "2020"
    },
    {
        salesName: "Rosa Amalia",
        customerName: "PT HAWLETT",
        yearAssign: "2020"
    },
    {
        salesName: "Rosa Amalia",
        customerName: "PT HAWLETT",
        yearAssign: "2020"
    },
]

export const projectHistoryHeader = [
    {
        key: "payment",
        header: "View Payment",
        type: "html"
    },
    {
        key: "funnelID",
        header: "Funnel ID"
    },
    {
        key: "so",
        header: "SO ID"
    },
    {
        key: "projectName",
        header: "Project Name"
    },
    {
        key: "customerName",
        header: "Customer Name"
    },
    {
        key: "salesName",
        header: "Sales Name"
    },
    {
        key: "salesDept",
        header: "Sales Dept."
    },
    {
        key: "soCloseDate",
        header: "SO Close Date"
    },
    {
        key: "soAmount",
        header: "SO Amount (IDR)"
    }
]

export const projectHistoryData = [
    {
        payment: 
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#656DD1", padding: "0.5rem", borderRadius: "100%", width: "fit-content"}} onClick={(event) => onClickPayment('payment diklik')}>
                <Icon style={{ margin: "0", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", color:"white"}} name="eye"/>
            </div>
        ,
        funnelID: 13345,
        so: 1225,
        top: 456678,
        projectName: "Lorem ipsun",
        customerName: "PT HAWLETT",
        salesName: "Rosa Amalia",
        salesDepartment: "CI",
        saDate: "01/12/2023",
        soCloseDate: "20/12/2023",
        soAmount: 11234000,
        lastCollectionDate: "02/12/2023",
    }
]

export const collectionHistoryHeader = [
    {
        key: "invoiceNumber",
        header: "Invoice Number"
    },
    {
        key: "invoiceDate",
        header: "Invoice Date"
    },
    {
        key: "soid",
        header: "SO ID"
    },
    {
        key: "collectionAmount",
        header: "Collection Amount"
    },
    {
        key: "collectionDate",
        header: "Collection Date"
    },
]

export const collectionHistoryData = [
    {
        invoiceNumber: "46-162821",
        invoiceDate: "15/10/2023",
        soid: 12915,
        collectionAmount: 125254000,
        collectionDate: "02/12/2023"
    }
]

export const configItemHeader = [
    {
        key: "productNumber",
        header: "Product Number"
    },
    {
        key: "soNumber",
        header: "SO Number"
    },
    {
        key: "poNumber",
        header: "PO Number"
    },
    {
        key: "poDate",
        header: "PO Date"
    },
    {
        key: "etaByPurchasing",
        header: "ETA By. Purchasing"
    },
    {
        key: "etaByPMO",
        header: "ETA By. PMO"
    },
    {
        key: "doDate",
        header: "DO Date"
    },
    {
        key: "descriptionItem",
        header: "Description Item"
    },
    {
        key: "brand",
        header: "Brand"
    },
    {
        key: "quantity",
        header: "Quantity"
    },
    {
        key: "warrantyStartDate",
        header: "Cust. Warranty Start Date"
    },
]

export const configItemData = [
    {
        productNumber: "XYZ-00456",
        soNumber: 1234,
        poNumber: 128821,
        poDate: "20/03/2022",
        etaByPurchasing: "10/05/2022",
        etaByPMO: "10/05/2022",
        doDate: "10/06/2022",
        descriptionItem: "Lorem Ipsun",
        brand: "LENOVO",
        quantity: 1,
        warrantyStartDate: "11/06/2022"
    }
]